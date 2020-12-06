import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
import LoginStyle from '../Login/styles';
import {Button} from 'react-native-elements';

function User(props) {
  //EXAMPLE
  // const [data, setData] = useState([]);
  // useSubscription(query, {
  //   onSubscriptionData: ({subscriptionData}) => {
  //     setData([...data, {...subscriptionData.data}]);
  //   },
  // });
  const {_id, name} = useSelector((state) => state.user);
  const [isShowingQR, showQR] = useState(false);
  return (
    <View>
      <Button
        containerStyle={styles.title}
        title="Generate Receiving QR"
        buttonStyle={styles.generateButton}
        titleStyle={styles.titleText}
        TouchableComponent={TouchableOpacity}
        onPress={() => showQR(true)}
      />
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
