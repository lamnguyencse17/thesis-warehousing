import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import styles from './styles';
import {connect} from 'react-redux';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverData: [],
      packageData: [],
    };
  }

  scanQrCode = (type) => () => {
    this.props.navigation.navigate('QRcodeScreen', {
      type: `${type}`,
    });
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
  render() {
    const {packageData} = this.props.addFormData;
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  addFormData: state.AddFormReducer,
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(FormInput);
