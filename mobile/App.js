import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/navigation/LoginScreen';
import AssetInfoScreen from './src/navigation/AssetInfoScreen';
import Router from './src/navigation/index';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //   SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
