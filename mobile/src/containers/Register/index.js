import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import RegisterStyle from './styles';

import {createRegisterRequest} from '../../request/user';
import {validateCreateUser} from '../../validators/userValidator';
import {Button, Input} from 'react-native-elements';
import LoginStyle from '../Login/styles';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  processRegisterSubmit = (values, setSubmitting) => {
    // Validation goes here
    const {email, password, name, password2} = values;
    const {status, message} = validateCreateUser({
      email,
      password,
      name,
      password2,
    });
    if (status === false) {
      if (message.length === 1) {
        this.setState({error: message});
      } else {
        this.setState({error: 'More than one field are invalid'});
      }
      setSubmitting(false);
    } else {
      this.register(values.name, values.email, values.password);
    }
  };
  register = async (name, email, password) => {
    const {status, message} = await createRegisterRequest({
      name,
      email,
      password,
    });
    if (status === true) {
      Alert.alert(
        'Register Success',
        'Please Login',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Login'),
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
            email: '',
            password: '',
            name: '',
            password2: '',
          }}
          onSubmit={(values, {setSubmitting}) =>
            this.processRegisterSubmit(values, setSubmitting)
          }>
          {({handleChange, handleSubmit, values, isSubmitting}) => (
            <View style={RegisterStyle.inputContainer}>
              <Input
                inputContainerStyle={RegisterStyle.inputView}
                inputStyle={RegisterStyle.inputText}
                disabled={isSubmitting}
                name="name"
                placeholder="Name"
                onChangeText={handleChange('name')}
                InputComponent={TextInput}
                onFocus={this.onFocusTextInput}
                placeholderTextColor="#003f5c"
                value={values.name}
              />
              <Input
                inputContainerStyle={RegisterStyle.inputView}
                inputStyle={RegisterStyle.inputText}
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
                inputStyle={RegisterStyle.inputText}
                disabled={isSubmitting}
                secureTextEntry
                inputContainerStyle={RegisterStyle.inputView}
                InputComponent={TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                onChangeText={handleChange('password')}
                value={values.password}
                onFocus={this.onFocusTextInput}
              />
              <Input
                name="password"
                inputStyle={RegisterStyle.inputText}
                disabled={isSubmitting}
                secureTextEntry
                inputContainerStyle={RegisterStyle.inputView}
                InputComponent={TextInput}
                placeholder="Retype your password please"
                placeholderTextColor="#003f5c"
                onChangeText={handleChange('password2')}
                value={values.password2}
                onFocus={this.onFocusTextInput}
              />
              {error === '' ? null : (
                <Text style={RegisterStyle.errorText}>{error}</Text>
              )}
              <Button
                title="Register"
                buttonStyle={RegisterStyle.registerButton}
                titleStyle={RegisterStyle.buttonText}
                TouchableComponent={TouchableOpacity}
                loading={isSubmitting}
                onPress={handleSubmit}
              />
              <Button
                title="Login"
                titleStyle={RegisterStyle.buttonText}
                buttonStyle={RegisterStyle.loginButton}
                TouchableComponent={TouchableOpacity}
                type="clear"
                loading={isSubmitting}
                onPress={() => this.props.navigation.navigate('Login')}
              />
            </View>
          )}
        </Formik>
      </View>
    );
  }
}
