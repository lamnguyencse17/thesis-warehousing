import React, {Fragment} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LoginStyle from './styles';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../redux/actions/user';
import {validateLogInUser} from '../../validators/userValidator';
import {createLoginRequest} from '../../request/user';
import {initClient} from '../../graphQL/graphQL';
import {Button, Input} from 'react-native-elements';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {email: '', password: ''},
    };
  }

  processLoginSubmit = async (values, setSubmitting) => {
    const {email, password} = values;
    const {status, message} = validateLogInUser({email, password});
    if (status === false) {
      if (message.email !== '' || message.password !== '') {
        console.log(message);
        this.setState({
          ...this.state,
          error: {...message},
        });
      }
      return;
    }
    const loginResult = await this.login(values.email, values.password);
    if (!loginResult) {
      setSubmitting(false);
    }
  };
  login = async (email, password) => {
    const {status, message, token} = await createLoginRequest({
      email,
      password,
    });
    if (status === true) {
      initClient(token);
      this.props.setUser(token);

      return true;
    } else {
      Alert.alert(
        'Login Fail',
        `${message}`,
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  };
  onFocusTextInput = () => {
    this.setState({error: ''});
  };

  render() {
    const {error} = this.state;
    return (
      <View style={LoginStyle.container}>
        <Text style={LoginStyle.logo}>TraceChain</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, {setSubmitting}) =>
            this.processLoginSubmit(values, setSubmitting)
          }>
          {({handleChange, handleSubmit, values, isSubmitting}) => (
            <View style={LoginStyle.inputContainer}>
              <Input
                inputContainerStyle={LoginStyle.inputView}
                inputStyle={LoginStyle.inputText}
                errorMessage={error.email}
                errorStyle={LoginStyle.errorText}
                disabled={isSubmitting}
                name="email"
                placeholder="Email"
                onChangeText={handleChange('email')}
                InputComponent={TextInput}
                onFocus={this.onFocusTextInput}
                placeholderTextColor="#003f5c"
                value={values.email}
              />
              <Input
                name="password"
                inputStyle={LoginStyle.inputText}
                errorMessage={error.password}
                errorStyle={LoginStyle.errorText}
                disabled={isSubmitting}
                secureTextEntry
                inputContainerStyle={LoginStyle.inputView}
                InputComponent={TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                onChangeText={handleChange('password')}
                value={values.password}
                onFocus={this.onFocusTextInput}
              />
              <TouchableOpacity>
                <Text style={LoginStyle.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <Button
                title="Login"
                buttonStyle={LoginStyle.loginButton}
                titleStyle={LoginStyle.buttonText}
                TouchableComponent={TouchableOpacity}
                loading={isSubmitting}
                onPress={handleSubmit}
              />
              <Button
                title="Register"
                titleStyle={LoginStyle.buttonText}
                buttonStyle={LoginStyle.registerButton}
                TouchableComponent={TouchableOpacity}
                type="clear"
                loading={isSubmitting}
                onPress={() => this.props.navigation.navigate('Register')}
              />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUser,
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(Login);
