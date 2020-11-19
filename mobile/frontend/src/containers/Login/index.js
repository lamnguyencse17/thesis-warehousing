import React, { Fragment } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LoginStyle from "./styles"
import {Formik} from 'formik';

export default class Login extends React.Component {
  processLoginSubmit = (values, setSubmitting) => {
    // Validation goes here
    // Async call goes here
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000);
  };
  render() {
    return (
      <View style={LoginStyle.container}>
        <Text style={LoginStyle.logo}>TraceChain</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values, {setSubmitting}) =>
            this.processLoginSubmit(values, setSubmitting)
          }>
          {({handleChange, handleSubmit, values, isSubmitting}) => 
            <Fragment>
              <View style={LoginStyle.inputView}>
                <TextInput
                  name="email"
                  style={LoginStyle.inputText}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('email')}
                  value={values.email}
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
                />
              </View>
              <TouchableOpacity>
                <Text style={LoginStyle.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={LoginStyle.loginBtn}
                onPress={handleSubmit}
                disabled={isSubmitting}>
                <Text style={LoginStyle.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={LoginStyle.loginText} onPress={() => this.props.navigation.navigate("RegisterScreen")}>Register</Text>
              </TouchableOpacity>
            </Fragment>
          }
        </Formik>
      </View>
    );
  }
}
