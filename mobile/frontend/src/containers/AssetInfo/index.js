import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Input} from '@components';
import {Language} from '@common';
import styles from './styles';

import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';
export default class AssetInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Apple',
      quantity: '40',
      unit: 'ton',
      description: 'Good',
      isGenerated: false,
      dataCode: null,
      enable: false,
    };
    this.onNameEditHandle = (name) => this.setState({name: name});
    this.onQuantityEditHandle = (quantity) =>
      this.setState({quantity: quantity});
    this.focusQuantity = () => {
      this.quantity && this.quantity.focus();
    };
    this.focusDescription = () => {
      this.description && this.description.focus();
    };
  }

  choosePickerUnit = (itemValue) => {
    this.setState({quantity: itemValue});
  };

  generateQRCode = () => {
    let {name, quantity, unit, description} = this.state;
    var data = [name, quantity, unit, description];
    this.setState({dataCode: data.toString()});
    this.setState({isGenerated: true});
  };
  toggleEnable = () => {
    if (this.state.enable == false) {
      return true;
    }
  };

  render() {
    const {name, quantity, unit, description, isGenerated} = this.state;
    let options = ['Cái', 'Gram', 'Kilogram', 'Tấn', 'Lít', 'Mét Khối'];
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{Language.AssetInfo.title}</Text>
          </View>
          <View style={styles.inputView}>
            <Input
              onChangeText={this.onNameEditHandle}
              onSubmitEditing={this.focusQuantity}
              ref={(comp) => (this.name = comp)}
              text={Language.AssetInfo.name}
              placeholderText={Language.AssetInfo.placeholder}
              value={name}
            />
            <Input
              text={Language.AssetInfo.quantity}
              ref={(comp) => (this.quantity = comp)}
              placeholderText={Language.AssetInfo.placeholder}
              keyboardType={'number-pad'}
              onChangeText={this.onQuantityEditHandle}
              onSubmitEditing={this.focusPicker}
              value={quantity}
            />
            <View style={styles.pickerView}>
              <Text style={styles.pickerTitle}>{Language.AssetInfo.unit}</Text>
              <Picker
                selectedValue={unit}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  this.setState({unit: itemValue});
                  this.focusDescription();
                }}
                value={unit}>
                {options.map((item, index) => {
                  return <Picker.Item label={item} value={item} key={index} />;
                })}
              </Picker>
            </View>
            <Input
              text={Language.AssetInfo.description}
              ref={(comp) => (this.description = comp)}
              placeholderText={Language.AssetInfo.placeholder}
              onChangeText={this.onQuantityEditHandle}
              value={description}
            />
          </View>
          <View style={{flex: 0.3}}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={this.generateQRCode}>
              <Text style={{textAlign: 'center'}}>Generate QR code</Text>
            </TouchableOpacity>
            <View style={styles.QRCodeView}>
              {isGenerated == true ? (
                <QRCode
                  value={JSON.stringify({
                    name: name,
                    quantity: quantity,
                    unit: unit,
                    description: description,
                  })}
                />
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
