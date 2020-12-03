import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
import {useSubscription, gql} from '@apollo/client';

const query = gql`
  subscription Subscription {
    assetCreated {
      _id
      name
    }
  }
`;

function User(props) {
  const {data} = useSubscription(query, {
    onSubscriptionData: () => {
      console.log('Loonf');
    },
  });
  const {_id, name} = useSelector((state) => state.user);
  const [isShowingQR, showQR] = useState(false);
  console.log(props);
  return (
    <View>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => showQR(true)}>
          <Text style={styles.titleText}>Generate Receiving QR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.QRCodeView}>
        {isShowingQR === true ? (
          <QRCode
            value={JSON.stringify({
              _id: _id,
              name: name,
            })}
          />
        ) : null}
      </View>
    </View>
  );
}

export default User;
