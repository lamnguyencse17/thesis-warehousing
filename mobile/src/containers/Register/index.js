import React from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import RegisterStyle from './styles';

import {createRegisterRequest} from '../../request/user';
import {validateCreateUser} from '../../validators/userValidator';
import {Button} from 'react-native-elements';

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
            </>
          )}
        </Formik>
      </View>
    );
  }
}
