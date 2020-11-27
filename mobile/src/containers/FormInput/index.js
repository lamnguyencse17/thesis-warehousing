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
      sender: [],
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
    const assets = this.state.assets.map((asset) => asset._id);
    const receiver = this.state.receiver._id;
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

  assetsData = (data) => {
    if (data.name === 'undefined') {
      return;
    }
    this.setState({assets: [...this.state.assets, data]});
  };

  receiverData = (data) => {
    if (data.receiver === 'undefined') {
      return;
    }

    this.setState({receiver: data});
  };

  setType = (type) => {
    this.setState({type: type});
  };

  render() {
    const {visible, assets, type, receiver} = this.state;
    return (
      <View style={styles.container}>
        <Modal visible={visible} animationType="slide">
          <QRCode
            assetsData={this.assetsData}
            receiverData={this.receiverData}
            type={type}
          />
          <TouchableOpacity
            onPress={this.toggleQRCode}
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
            <TouchableOpacity
              onPress={() => {
                this.toggleQRCode();

                this.setType(1);
              }}>
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
            <TouchableOpacity
              onPress={() => {
                this.toggleQRCode();
                this.setType(2);
              }}>
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
          style={styles.buttonSubmit}>
          <Text style={{textAlign: 'center'}}>SUBMIT TRANSACTION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
