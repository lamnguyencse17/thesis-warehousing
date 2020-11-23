import React, {Fragment} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import LoginStyle from './styles';
import {Formik} from 'formik';

import {validateLogInUser} from '../../validators/userValidator';
import {createLoginRequest} from '../../request/user';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  processLoginSubmit = (values, setSubmitting) => {
    // Validation goes here
    const {email, password} = values;
    const {status, message} = validateLogInUser({email, password});
    if (status == false) {
      if (message.length == 1) {
        this.setState({error: message});
      } else {
        this.setState({error: 'More than one field are invalid'});
      }
    } else {
      this.login(values.email, values.password);
    }
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000);
  };
  login = async (email, password) => {
    const {status, token, message} = await createLoginRequest({
      email,
      password,
    });
    if (status == true) {
      Alert.alert(
        'Login Success',
        'Hello',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
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
              {error == '' ? null : (
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
                  onPress={() =>
                    this.props.navigation.navigate('RegisterScreen')
                  }>
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
