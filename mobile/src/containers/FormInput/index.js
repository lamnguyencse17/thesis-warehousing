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
      receiverData: [],
      packageData: [],
      visible: false,
    };
  }
  toggleQRCode = () => {
    this.setState((prevState) => ({visible: !prevState.visible}));
  };
  scanQrCode = (type) => () => {
    this.toggleQRCode();
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
    // const assetIds = this.state.packageData.map(asset => asset._id)
    const assets = ['5fb392d6dab9670184275ece', '5fb3973d30f5e20439a8e2b0'];
    const receiver = '5fb411eb8173b602387d8769';
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

  addDataToPackage = (data) => {
    const {packageData} = this.state;
    let tempPackageData = [...packageData, data];
    this.setState({packageData: tempPackageData});
  };

  render() {
    // const {packageData} = this.props.addFormData;
    const {visible, packageData} = this.state;
    return (
      <View style={styles.container}>
        <Modal visible={visible} animationType="slide">
          <QRCode addDataToPackage={this.addDataToPackage} />
          <Button
            title="Submit to package"
            onPress={this.toggleQRCode}
            style={styles.toggleModal}
          />
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>FORM CONFIRM TRANSACTION</Text>
        </View>
        <View style={styles.ReceiverView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of receiver: </Text>
            <TouchableOpacity onPress={this.scanQrCode('receiver')}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.PackageView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.sectionText}>Information of package: </Text>
            <TouchableOpacity onPress={this.scanQrCode('package')}>
              <Text style={styles.buttonText}>Scan QR</Text>
            </TouchableOpacity>
          </View>
          {!!packageData !== [] ? (
            <View style={styles.dataOfPackage}>
              <FlatList
                data={packageData}
                keyExtractor={this._keyExtractor}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            </View>
          ) : null}
        </View>
        <Button
          title="Submit Transaction"
          onPress={this.handleSubmitTransaction}
        />
      </View>
    );
  }
}
