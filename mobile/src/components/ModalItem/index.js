import {Styles} from '@common';
import React, {Component, useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const ModalItem = (props) => {
  const {name, quantity, unit, description} = props.data;

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} style={styles.modalView}>
        <View style={styles.modalView}>
          <Text>{name}</Text>
          <Text>{quantity}</Text>
          <Text>{unit}</Text>
          <Text>{description}</Text>
          <TouchableOpacity onPress={() => props.setIndexItem(-1)}>
            <Text>BACK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Styles.height / 2,
  },
  modalView: {
    marginTop: Styles.height / 2 - 40,
    marginHorizontal: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalItem;
