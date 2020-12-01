import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AssetInfoScreen from './AssetInfoScreen';
import FormInputScreen from './FormInputScreen';
import UserScreen from './UserScreen';
const Drawer = createDrawerNavigator();

export default class HomeScreen extends Component {
  render() {
    return (
      <>
        <Drawer.Navigator initialRouteName="User">
          <Drawer.Screen name="Asset" component={AssetInfoScreen} />
          <Drawer.Screen name="Transaction" component={FormInputScreen} />
          <Drawer.Screen name="User" component={UserScreen} />
        </Drawer.Navigator>
      </>
    );
  }
}
