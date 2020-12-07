import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
// import styles from './styles';
import {gql, useQuery} from '@apollo/client';

const queryTransactionHistory = gql`
  query Query {
    getAssetHistory(_id: "5fc9e5cdfbfe230606d9d5e5", limit: 5, offset: 0) {
      _id
      name
      quantity
      description
      owner
      unit
      transactions {
        _id
        receiver {
          _id
          name
          email
        }
        sender {
          _id
          name
          email
        }
      }
    }
  }
`;
function TransactionHistory(props) {
  const {loading, error, data} = useQuery(queryTransactionHistory);
  useEffect(() => {
    if (!loading) {
      console.log('history', data);
    }
  });
  return (
    <View>
      <Text>TransactionHistory</Text>
    </View>
  );
}

export default TransactionHistory;
