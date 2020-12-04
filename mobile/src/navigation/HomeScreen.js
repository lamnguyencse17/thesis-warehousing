import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AssetCreatorScreen from './AssetCreatorScreen';
import TransactionCreatorScreen from './TransactionCreatorScreen';
import UserScreen from './UserScreen';
import {ApolloProvider} from '@apollo/client';
import {getClient} from '../graphQL/graphQL';

const Drawer = createDrawerNavigator();

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
        </Drawer.Navigator>
      </ApolloProvider>
    );
  }
}
