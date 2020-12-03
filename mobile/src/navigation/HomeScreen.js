import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AssetCreatorScreen from './AssetCreatorScreen';
import TransactionCreatorScreen from './TransactionCreatorScreen';
import UserScreen from './UserScreen';
import {ApolloProvider, gql} from '@apollo/client';

const Drawer = createDrawerNavigator();
import {client} from '../graphQL/graphQL';

export default class HomeScreen extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Drawer.Navigator initialRouteName="User">
          <Drawer.Screen name="Asset" component={AssetCreatorScreen} />
          <Drawer.Screen
            name="Transaction"
            component={TransactionCreatorScreen}
          />
          <Drawer.Screen name="User" component={UserScreen} />
        </Drawer.Navigator>
      </ApolloProvider>
    );
  }
}
