import React, {Fragment} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import LoginStyle from './styles';
import {Formik} from 'formik';

import {isValidEmail, isValidPassword} from '../../common/Validate';

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
      // Async call goes here

      console.log('OK');
    }
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000);
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
