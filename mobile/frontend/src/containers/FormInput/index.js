import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverData: '',
      packageData: [],
    };
  }

  scanQrCode = () => {
    this.props.navigation.navigate('QRcodeScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>FORM CONFIRM TRANSACTION</Text>
        </View>
        <View style={styles.ReceiverView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of receiver: </Text>
            <TouchableOpacity onPress={this.scanQrCode}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.PackageView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of package: </Text>
            <TouchableOpacity onPress={this.scanQrCode}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
