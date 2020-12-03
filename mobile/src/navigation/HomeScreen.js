import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AssetCreatorScreen from './AssetCreatorScreen';
import TransactionCreatorScreen from './TransactionCreatorScreen';
import UserScreen from './UserScreen';
import {ApolloProvider, gql} from '@apollo/client';

const query = gql`
  subscription Subscription {
    assetCreated {
      _id
      name
    }
  }
`;

const queryb = gql`
  query Query {
    getOneAsset(_id: "5fc48551f70e44019dc653c9") {
      _id
      name
      quantity
      description
    }
  }
`;

const Drawer = createDrawerNavigator();
import {client} from '../graphQL/graphQL';
import {View} from 'react-native';

export default class HomeScreen extends Component {
  // async componentDidMount() {
  //   const data = await client.query({query: queryb});
  //   console.log(data.data);
  //   const observer = client.subscribe({query});
  //   observer.subscribe({
  //     next(data) {
  //       console.log(data);
  //     },
  //   });
  // }

  render() {
    return (
      <ApolloProvider client={client}>
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

const Header = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
