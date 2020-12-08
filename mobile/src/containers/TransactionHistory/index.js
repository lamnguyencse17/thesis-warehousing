import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styles from './styles';
import {gql, useQuery} from '@apollo/client';

const queryTransactionHistory = gql`
  query Query {
    getAssetHistory(_id: "5fcf6e88f5b1e501e4e2293d", limit: 5, offset: 0) {
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
      console.log('history', data.getAssetHistory.transactions);
    }
  });
  const listHistory = data.getAssetHistory.transactions.map((history, key) => {
    return (
      <View style={styles.sender} key={key}>
        <Text style={styles.content}>From: {history.sender.name}</Text>
        <Text>------></Text>
        <Text style={styles.content}>To: {history.receiver.name}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>TRANSACTION HISTORY</Text>
      </View>
      {listHistory}
    </View>
  );
}

export default TransactionHistory;
