import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AssetCreatorScreen from './AssetCreatorScreen';
import TransactionCreatorScreen from './TransactionCreatorScreen';
import YourAssetScreen from './YourAssetScreen';
import UserScreen from './UserScreen';
import {ApolloProvider} from '@apollo/client';
import {getClient} from '../graphQL/graphQL';
import {createStackNavigator} from '@react-navigation/stack';
import TransactionHistoryScreen from './TransactionHistoryScreen';
const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const stackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Your Asset"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Your Asset" component={YourAssetScreen} />
      <Stack.Screen
        name="Transaction History"
        component={TransactionHistoryScreen}
        screenOptions={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default class HomeScreen extends Component {
  render() {
    return (
      <ApolloProvider client={getClient()}>
        <Drawer.Navigator initialRouteName="User">
          <Drawer.Screen
            name="Asset"
            component={AssetCreatorScreen}
            options={{headerShown: true}}
          />
          <Drawer.Screen
            name="Transaction"
            component={TransactionCreatorScreen}
            options={{headerShown: true}}
          />
          <Drawer.Screen
            name="User"
            component={UserScreen}
            options={{
              headerShown: true,
            }}
          />
          <Drawer.Screen
            name="Your Asset"
            component={stackNavigator}
            options={{
              headerShown: true,
            }}></Drawer.Screen>
        </Drawer.Navigator>
      </ApolloProvider>
    );
  }
}
