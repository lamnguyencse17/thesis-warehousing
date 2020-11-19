import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import RegisterStyle from "./styles"

export default class Register extends React.Component {
  processRegisterSubmit = (values, setSubmitting) => {
    // Validation goes here
    // Async call goes here
    setTimeout(() => {      
      console.log(values);
      setSubmitting(false);
    }, 2000);
  };
  render() {
    return (
      <View style={RegisterStyle.container}>
        <Text style={RegisterStyle.logo}>TraceChain</Text>
        <Formik
          initialValues={{email: '', password: '', name: '', password2: ''}}
          onSubmit={(values, {setSubmitting}) => this.processRegisterSubmit(values, setSubmitting)}>
          {({handleChange, handleSubmit, values, isSubmitting}) => (
            <>
              <View style={RegisterStyle.inputView}>
                <TextInput
                  name="name"
                  style={RegisterStyle.inputText}
                  placeholder="Name"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
              </View>
              <View style={RegisterStyle.inputView}>
                <TextInput
                  name="email"
                  style={RegisterStyle.inputText}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
              </View>
              <View style={RegisterStyle.inputView}>
                <TextInput
                  name="password"
                  secureTextEntry
                  style={RegisterStyle.inputText}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
              <View style={RegisterStyle.inputView}>
                <TextInput
                  name="password2"
                  secureTextEntry
                  style={RegisterStyle.inputText}
                  placeholder="Retype your password please"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('password2')}
                  value={values.password2}
                />
              </View>
              <TouchableOpacity>
                <Text style={RegisterStyle.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={RegisterStyle.loginBtn} onPress={handleSubmit} disabled={isSubmitting}>
                <Text style={RegisterStyle.loginText}>REGISTER</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={RegisterStyle.loginText} onPress={() => this.props.navigation.navigate("LoginScreen")}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
}
