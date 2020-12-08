import React from 'react';
import {View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {Config} from '@common';
import styles from './styles';

const ModalItem = (props) => {
  const {name, quantity, unit, description, _id} = props.data;

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true}>
        <View style={styles.modalView}>
          <View style={styles.viewRow}>
            <View>
              <Text>Name: {name}</Text>
              <Text>Quantity: {quantity}</Text>
              <Text>Unit: {Config.options[unit]}</Text>
              <Text>Description: {description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.setIndexItem(-1);
                props.navigation.navigate('Transaction History');
              }}>
              <Image
                source={require('../../assets/history.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewRow}>
            <TouchableOpacity
              onPress={() => props.setIndexItem(-1)}
              style={styles.backButton}>
              <Text style={{textDecorationLine: 'underline', color: 'blue'}}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.assetButton}>
              <Text style={{textDecorationLine: 'underline', color: 'blue'}}>
                Asset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalItem;
