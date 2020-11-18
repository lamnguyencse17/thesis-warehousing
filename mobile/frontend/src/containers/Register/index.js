import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';

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
      <View style={styles.container}>
        <Text style={styles.logo}>TraceChain</Text>
        <Formik
          initialValues={{email: '', password: '', name: '', password2: ''}}
          onSubmit={(values, {setSubmitting}) => this.processRegisterSubmit(values, setSubmitting)}>
          {({handleChange, handleSubmit, values, isSubmitting}) => (
            <>
              <View style={styles.inputView}>
                <TextInput
                  name="name"
                  style={styles.inputText}
                  placeholder="Name"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('name')}
                  value={values.name}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  name="email"
                  style={styles.inputText}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  name="password"
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  name="password2"
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Retype your password please"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange('password2')}
                  value={values.password2}
                />
              </View>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit} disabled={isSubmitting}>
                <Text style={styles.loginText}>REGISTER</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.loginText} onPress={() => this.props.navigation.navigate("LoginScreen")}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
