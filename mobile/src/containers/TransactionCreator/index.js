import React, {Component} from 'react';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

import {createTransactionRequest} from '../../request/transaction';
import QRCodeScanner from '../QRCodeScanner';
import {Button} from 'react-native-elements';

export default class TransactionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverData: [],
      assetData: [],
      visible: false,
      type: 0,
    };
  }

  //Type sender: 0, receiver: 1, assets : 2
  toggleQRCode = () => {
    this.setState((prevState) => ({visible: !prevState.visible}));
  };

  _keyExtractor = (item, index) => index.toString();

  renderItem = (item, index) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemText}>{index + 1}. </Text>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };
  handleSubmitTransaction = async () => {
    const assets = this.state.assetData.map((asset) => asset._id);
    const receiver = this.state.receiverData._id;
    const sender = '5fb411df8173b602387d8768';
    const createTransactionResult = await createTransactionRequest({
      receiver,
      sender,
      assets,
    });
    if (!createTransactionResult.status) {
      console.log(createTransactionResult.message);
      return;
    }
    console.log('Success');
  };

  addDataToAssets = (data) => {
    if (data.name === 'undefined') {
      return;
    }
    this.setState({assetData: [...this.state.assetData, data]});
  };

  addDataToReceiver = (data) => {
    if (data.receiver === 'undefined') {
      return;
    }

    this.setState({receiverData: data});
  };

  setType = (type) => {
    this.setState({type: type});
  };

  render() {
    const {visible, assetData, type, receiverData} = this.state;
    return (
      <View style={styles.container}>
        <Modal visible={visible} animationType="slide">
          <QRCodeScanner
            addDataToAssets={this.addDataToAssets}
            addDataToReceiver={this.addDataToReceiver}
            type={type}
          />
          <TouchableOpacity
            onPress={this.toggleQRCode}
            style={styles.generateButton}>
            <Text style={{textAlign: 'center'}}>DONE</Text>
          </TouchableOpacity>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>CREATE A NEW TRANSACTION</Text>
        </View>
        <View style={styles.ReceiverView}>
          <Button
            title="Scan Receiver QR"
            buttonStyle={styles.loginButton}
            titleStyle={styles.buttonText}
            TouchableComponent={TouchableOpacity}
            onPress={() => {
              this.toggleQRCode();
              this.setType(1);
            }}
          />
          {receiverData.length === 0 ? null : (
            <View style={styles.textReceiver}>
              <Text>ID: {receiverData._id}</Text>
              <Text>Receiver: {receiverData.receiver}</Text>
            </View>
          )}
        </View>
        <View>
          <Button
            title="Scan Asset QR"
            buttonStyle={styles.loginButton}
            titleStyle={styles.buttonText}
            TouchableComponent={TouchableOpacity}
            onPress={() => {
              this.toggleQRCode();
              this.setType(2);
            }}
          />
          {assetData.length === 0 ? null : (
            <View>
              <FlatList
                data={assetData}
                keyExtractor={this._keyExtractor}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={this.handleSubmitTransaction}
          style={styles.buttonSubmit}>
          <Text style={{textAlign: 'center'}}>SUBMIT TRANSACTION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
