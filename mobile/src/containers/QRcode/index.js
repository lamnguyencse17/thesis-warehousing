import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Button} from 'react-native';
import styles from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {Config} from '@common';

export default class QRcodeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      showModal: false,
      active: false,
    };
  }

  onSuccess = (e) => {
    let data = e.data;
    if (data.includes('"')) {
      data = JSON.parse(data);
    }
    this.setState({showModal: true, data: data, reactivate: false});
    if (typeof this.props.addDataToPackage == 'function') {
      this.props.addDataToPackage(data);
    } else {
      return;
    }
  };

  toogleActive = () => {
    this.scanner.reactivate();
  };

  render() {
    const {data, showModal} = this.state;

    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        ref={(node) => {
          this.scanner = node;
        }}
        topContent={
          <View style={styles.centerText}>
            <Text style={styles.textBold}>Scan QRCode in to transaction</Text>
            <TouchableOpacity onPress={this.toogleActive} style={styles.button}>
              <Text style={styles.textReactive}>React active scan</Text>
            </TouchableOpacity>
          </View>
        }
        bottomContent={
          showModal == false ? null : (
            <View style={styles.bottomView}>
              <Text style={[styles.text, styles.title]}>
                Thông tin sản phẩm
              </Text>
              <View style={styles.contentView}>
                <View>
                  <Text style={styles.text}>Sản phẩm: {`${data.name}`}</Text>
                  <Text style={styles.text}>
                    Miêu tả: {`${data.description}`}
                  </Text>
                </View>
                <View>
                  <Text style={styles.text}>
                    Số lượng: {`${data.quantity}`}
                  </Text>
                  <Text style={styles.text}>
                    Đơn vị: {`${Config.options[data.unit]}`}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
        cameraStyle={styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
      />
    );
  }
}
