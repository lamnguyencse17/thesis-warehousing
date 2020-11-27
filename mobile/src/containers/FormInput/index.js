import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  Modal,
} from 'react-native';

import styles from './styles';

import {createTransactionRequest} from '../../request/transaction';
import QRCode from '../QRcode';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiver: [],
      assets: [],
      visible: false,
      type: '',
    };
  }
  toggleQRCode = (type) => () => {
    this.setState((prevState) => ({visible: !prevState.visible}));
    this.setState({type: type});
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
    const assetIds = assets.map((asset) => asset._id);
    const receiver = receiver._id;
    const sender = '5fb411df8173b602387d8768';
    const createTransactionResult = await createTransactionRequest({
      receiver,
      sender,
      assetIds,
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
    let tempAssets = [...this.state.assets, data];
    this.setState({assets: tempAssets});
  };

  addDataToReceiver = (data) => {
    if (data.receiver === 'undefined') {
      return;
    }

    this.setState({receiver: data});
  };

  render() {
    const {visible, assets, type, receiver} = this.state;
    return (
      <View style={styles.container}>
        <Modal visible={visible} animationType="slide">
          <QRCode
            addDataToAssets={this.addDataToAssets}
            addDataToReceiver={this.addDataToReceiver}
            type={type}
          />
          <TouchableOpacity
            onPress={this.toggleQRCode('')}
            style={styles.generateButton}>
            <Text style={{textAlign: 'center'}}>DONE</Text>
          </TouchableOpacity>
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>FORM CONFIRM TRANSACTION</Text>
        </View>
        <View style={styles.ReceiverView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of receiver: </Text>
            <TouchableOpacity onPress={this.toggleQRCode('receiver')}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
          {receiver.length == 0 ? null : (
            <View style={styles.textReceiver}>
              <Text>ID: {receiver._id}</Text>
              <Text>Receiver: {receiver.receiver}</Text>
            </View>
          )}
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of package: </Text>
            <TouchableOpacity onPress={this.toggleQRCode('asset')}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
          {assets.length == 0 ? null : (
            <View>
              <FlatList
                data={assets}
                keyExtractor={this._keyExtractor}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={this.handleSubmitTransaction}
          style={[styles.buttonSubmit]}>
          <Text style={{textAlign: 'center'}}>SUBMIT TRANSACTION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
