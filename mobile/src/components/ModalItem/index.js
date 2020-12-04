import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {Config} from '@common';
import styles from './styles';

const ModalItem = (props) => {
  const {name, quantity, unit, description} = props.data;

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true}>
        <View style={styles.modalView}>
          <Text>Name: {name}</Text>
          <Text>Quantity: {quantity}</Text>
          <Text>Unit: {Config.options[unit]}</Text>
          <Text>Description: {description}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
