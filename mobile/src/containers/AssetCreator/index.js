import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Input} from '@components';
import {Config, Language} from '@common';
import styles from './styles';

import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';
import {createAssetRequest} from '../../request/asset';

export default class AssetCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: 'Apple',
      quantity: '',
      unit: '0',
      description: 'Good',
      isGenerated: false,
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

  createAssetAndGenerate = async () => {
    let {name, description} = this.state;

    let unit = parseInt(this.state.unit);
    let quantity = parseInt(this.state.quantity);
    const {status, assets} = await createAssetRequest({
      name,
      quantity,
      unit,
      description,
    });
    let asset = assets[0]
    if (status) {
      this.setState(
        {
          ...this.state,
          ...asset,
          quantity: asset.quantity.toString(),
          unit: asset.unit.toString(),
        },
        () => {
          console.log(this.state);
          this.generateQRCode();
        },
      );
    }
  };

  generateQRCode = () => {
    this.setState({isGenerated: true});
  };

  render() {
    const {name, quantity, unit, description, isGenerated, _id} = this.state;
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
                onValueChange={(itemIndex) => {
                  this.setState({unit: itemIndex});
                  this.focusDescription();
                }}
                value={unit}>
                {Config.options.map((item, index) => {
                  return <Picker.Item label={item} value={index} key={index} />;
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
              onPress={this.createAssetAndGenerate}>
              <Text style={{textAlign: 'center'}}>
                Create Asset and Generate QR code
              </Text>
            </TouchableOpacity>
            <View style={styles.QRCodeView}>
              {isGenerated === true ? (
                <QRCode
                  value={JSON.stringify({
                    _id: _id,
                    name: name,
                    quantity: parseInt(quantity),
                    unit: parseInt(unit),
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
