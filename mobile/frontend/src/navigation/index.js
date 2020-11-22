import React from 'react';
import {Text, View, Image} from 'react-native';

import {
  createAppContainer,
  createSwitchNavigator,
  StackActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import AssetInfo from './AssetInfoScreen';
import QRcodeScreen from './QRcodeScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import FormInputScreen from './FormInputScreen';
const defaultHeaderObject = {
  header: (props) => <Header type={'group'} />,
};

const createDefaultStackNavigator = (screensObject, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: {...defaultHeaderObject},
    headerMode: 'screen',
    ...customOptions,
  });

// const AuthStack = createDefaultStackNavigator(
//   {
//     [RouteNames.Auth]: {
//       screen: AuthScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     [RouteNames.Login]: {
//       screen: LoginScreen,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       header: () => <HeaderAuth />,
//     },
//   },
// );

// const AvailableGroupChat = createDefaultStackNavigator(
//   {
//     [RouteNames.GroupChat]: {
//       screen: GroupChatScreen,
//     },
//     [RouteNames.Chat]: {
//       screen: ChatScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//     [RouteNames.Search]: {
//       screen: SearchScreen,
//       navigationOptions: {
//         headerShown: false,
//       },
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       header: ({navigation}) => (
//         <Header type={'group'} navigation={navigation} />
//       ),
//     },
//   },
// );

const appContainer = createBottomTabNavigator({
  AssetInfo: {
    screen: AssetInfo,
    // navigationOptions: {
    //   headerShown: false,
    // },
  },
  QRcodeScreen: {
    screen: QRcodeScreen,
    // navigationOptions: {
    //   headerShown: false,
    // },r
  },
  LoginScreen: {
    screen: LoginScreen,
    // navigationOptions: {
    //   headerShown: false,
    // },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    // navigationOptions: {
    //   headerShown: false,
    // },
  },
  FormInputScreen: {
    screen: FormInputScreen,
    // navigationOptions: {
    //   headerShown: false,
    // },
  },
});

export default createAppContainer(appContainer);
