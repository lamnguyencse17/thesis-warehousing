import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import styles from './styles';
import LoginStyle from '../Login/styles';

const DATA = [
  {
    title: 'Asset',
    screen: 'Asset',
  },
  {title: 'Transaction', screen: 'Transaction'},
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
        <Text style={LoginStyle.loginText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => <Item {...item} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default Home;
