import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Styles, Color} from '@common';
const Input = React.forwardRef((props, ref) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.text}>{props.text} :</Text>
      <TextInput
        ref={ref}
        placeholder={props.placeholderText}
        placeholderTextColor={Color.placeholderTextColor}
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {},
  text: {
    fontSize: Styles.FontSize.big,
    alignSelf: 'flex-start',
  },
  placeHolder: {
    fontFamily: Styles.FontFamily.QuicksandMedium,
    fontSize: 12,
  },
  mainView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 20,
  },
});

export default Input;
