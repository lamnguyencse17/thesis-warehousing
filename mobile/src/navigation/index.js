import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

import {bindActionCreators} from 'redux';
import {setUser} from '../redux/actions/user';
import HomeScreen from './HomeScreen';

import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

class Router extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.token !== '') {
      this.props.setUser(this.props.token);
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          {this.props.token === '' ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
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

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
