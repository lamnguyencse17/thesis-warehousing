import React, {Fragment} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import LoginStyle from './styles';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUser} from '../../redux/actions/user';
import {validateLogInUser} from '../../validators/userValidator';
import {createLoginRequest} from '../../request/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  processLoginSubmit = async (values, setSubmitting) => {
    const {email, password} = values;
    const {status, message} = validateLogInUser({email, password});
    if (status === false) {
      if (message.length === 1) {
        this.setState({error: message});
      } else {
        this.setState({error: 'More than one field are invalid'});
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
            <Fragment>
              <View style={LoginStyle.inputView}>
                <TextInput
                  name="email"
                  style={LoginStyle.inputText}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onFocus={this.onFocusTextInput}
                />
              </View>
              <View style={LoginStyle.inputView}>
                <TextInput
                  name="password"
                  secureTextEntry
                  style={LoginStyle.inputText}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onFocus={this.onFocusTextInput}
                />
              </View>
              <TouchableOpacity>
                <Text style={LoginStyle.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              {error === '' ? null : (
                <Text style={LoginStyle.errorText}>{error}</Text>
              )}
              <TouchableOpacity
                style={LoginStyle.loginBtn}
                onPress={handleSubmit}
                disabled={isSubmitting}>
                <Text style={LoginStyle.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={LoginStyle.loginText}
                  onPress={() => this.props.navigation.navigate('Register')}>
                  Register
                </Text>
              </TouchableOpacity>
            </Fragment>
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
