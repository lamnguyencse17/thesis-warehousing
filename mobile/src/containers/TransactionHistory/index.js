import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {gql, useQuery} from '@apollo/client';

const queryTransactionHistory = gql`
  query Query($_id: ID!) {
    getAssetHistory(_id: $_id, limit: 5, offset: 0) {
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
  const {loading, data} = useQuery(queryTransactionHistory, {
    variables: {_id: props.route.params._id.toString()},
  });
  // const {loading, error, data} = useQuery(queryTransactionHistory);

  useEffect(() => {
    if (!loading) {
      console.log('history', data.getAssetHistory);
    }
  });
  const listHistory =
    loading == false
      ? data.getAssetHistory.transactions.map((history, key) => {
          return (
            <View style={styles.sender} key={key}>
              <Text style={styles.content}>From: {history.sender.name}</Text>
              <Text>------></Text>
              <Text style={styles.content}>To: {history.receiver.name}</Text>
            </View>
          );
        })
      : null;
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
