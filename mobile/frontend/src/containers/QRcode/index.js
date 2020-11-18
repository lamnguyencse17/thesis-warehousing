import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class QRcode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSuccess = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // reactivate={true}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan QRCode in to transaction</Text>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
