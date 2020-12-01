import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './LoginScreen';
import AssetInfoScreen from './AssetInfoScreen';
import {bindActionCreators} from 'redux';
import {setUser} from '../redux/actions/user';
import HomeScreen from './HomeScreen';
import FormInputScreen from './FormInputScreen';
import RegisterScreen from './RegisterScreen';
import UserScreen from './UserScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
    return this.props.token === '' ? (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        initialRouteName="Home" screenOptions=
        {{
          headerShown: false,
        }}
        >
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Asset" component={AssetInfoScreen} />
          <Drawer.Screen name="Transaction" component={FormInputScreen} />
          <Drawer.Screen name="User" component={UserScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Login"
    //     screenOptions={{
    //       headerShown: false,
    //     }}>
    //     {this.props.token === '' ? (
    //       <>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="Register" component={RegisterScreen} />
    //       </>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //         {/*<Stack.Screen name="Asset" component={AssetInfoScreen} />*/}
    //         {/*<Stack.Screen name="Transaction" component={FormInputScreen} />*/}
    //         {/*<Stack.Screen name="User" component={UserScreen} />*/}
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  }
}

// const defaultHeaderObject = {
//   header: (props) => <Header type={'group'} />,
// };
//
// const createDefaultStackNavigator = (screensObject, customOptions) =>
//   createStackNavigator(screensObject, {
//     defaultNavigationOptions: {...defaultHeaderObject},
//     headerMode: 'screen',
//     ...customOptions,
//   });

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

// const appContainer = createBottomTabNavigator({
//   AssetInfo: {
//     screen: AssetInfo,
//     // navigationOptions: {
//     //   headerShown: false,
//     // },
//   },
//   QRcodeScreen: {
//     screen: QRcodeScreen,
//     // navigationOptions: {
//     //   headerShown: false,
//     // },r
//   },
//   LoginScreen: {
//     screen: LoginScreen,
//     // navigationOptions: {
//     //   headerShown: false,
//     // },
//   },
//   RegisterScreen: {
//     screen: RegisterScreen,
//     // navigationOptions: {
//     //   headerShown: false,
//     // },
//   },
//   FormInputScreen: {
//     screen: FormInputScreen,
//     // navigationOptions: {
//     //   headerShown: false,
//     // },
//   },
// });
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
