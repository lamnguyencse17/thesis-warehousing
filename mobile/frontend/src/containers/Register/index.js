import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Formik} from 'formik';
import RegisterStyle from './styles';
import {
  isValidName,
  isValidPassword,
  isValidEmail,
} from '../../common/Validate';
import {createRegisterRequest} from '../../request/user';
import {Config} from '@common';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  processRegisterSubmit = (values, setSubmitting) => {
    // Validation goes here
    if (!isValidEmail(values.email)) {
      this.setState({error: 'Invalid Email'});
    } else if (
      !isValidPassword(values.password) ||
      !isValidPassword(values.password2)
    ) {
      this.setState({error: 'Invalid Password'});
    } else if (!isValidName(values.name)) {
      this.setState({error: 'Invalid Name'});
    } else {
      this.register(values.name, values.email, values.password);
    }

    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000);
  };
  register = async (name, email, password) => {
    const {status, user, message} = await createRegisterRequest({
      name,
      email,
      password,
    });
    if (status == true) {
      Alert.alert(
        'Register Success',
        `Hello ${name}`,
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('LoginScreen'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Register Fail',
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
      <View style={RegisterStyle.container}>
        <Text style={RegisterStyle.logo}>TraceChain</Text>
        <Formik
          initialValues={{
            email: 'manhhung@email.com',
            password: '123456',
            name: 'hungtran',
            password2: '123456',
          }}
          onSubmit={(values, {setSubmitting}) =>
            this.processRegisterSubmit(values, setSubmitting)
          }>
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
                  onFocus={this.onFocusTextInput}
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
                  onFocus={this.onFocusTextInput}
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
                  onFocus={this.onFocusTextInput}
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
                  onFocus={this.onFocusTextInput}
                />
              </View>

              <TouchableOpacity>
                <Text style={RegisterStyle.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
              {error == '' ? null : (
                <Text style={RegisterStyle.errorText}>{error}</Text>
              )}
              <TouchableOpacity
                style={RegisterStyle.loginBtn}
                onPress={handleSubmit}
                disabled={isSubmitting}>
                <Text style={RegisterStyle.loginText}>REGISTER</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={RegisterStyle.loginText}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
}
