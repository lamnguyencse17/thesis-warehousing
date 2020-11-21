import React, {Fragment} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import LoginStyle from './styles';
import {Formik} from 'formik';

import {isValidEmail, isValidPassword} from '../../common/Validate';
import {Config} from '@common';
import axios from 'axios';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  processLoginSubmit = (values, setSubmitting) => {
    // Validation goes here
    if (!isValidEmail(values.email)) {
      this.setState({error: 'Invalid Email'});
      // return;
    } else if (!isValidPassword(values.password)) {
      this.setState({error: 'Invalid Password'});
    } else {
      this.login(values.email, values.password);
    }
  };
  login = async (email, password) => {
    const login = await axios.post(`${Config.server}/auth/login`, {
      email: `${email}`,
      password: `${password}`,
    });
    if (login) {
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
      console.log('cookies', login.cookies);
      console.log('login', login._lowerCaseResponseHeaders['set-cookie']);
    } else {
      Alert.alert(
        'Login Fail',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('LoginScreen'),
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
          initialValues={{email: 'hung123@gmail.com', password: '123456'}}
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
