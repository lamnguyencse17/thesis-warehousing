import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import styles from './styles';
import HomeScreen from '../../navigation/HomeScreen';
import AssetInfoScreen from '../../navigation/AssetInfoScreen';
import FormInputScreen from '../../navigation/FormInputScreen';
import UserScreen from '../../navigation/UserScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
const DATA = [
  {
    title: 'Asset',
    screen: 'Asset',
  },
  {title: 'Transaction', screen: 'Transaction'},
  {title: 'User', screen: 'User'},
];

function Home(props) {
  const {navigation} = props;
  const Item = ({title, screen}) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          console.log(screen);
          navigation.dispatch(
            CommonActions.navigate({
              name: screen,
            }),
          );
        }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => <Item {...item} />;
  return (
    <>
      {/*<Drawer.Navigator>*/}
      {/*  <Drawer.Screen name="Asset" component={AssetInfoScreen} />*/}
      {/*  <Drawer.Screen name="Transaction" component={FormInputScreen} />*/}
      {/*  <Drawer.Screen name="User" component={UserScreen} />*/}
      {/*</Drawer.Navigator>*/}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </>
  );
}

export default Home;
