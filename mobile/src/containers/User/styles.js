import {StyleSheet} from 'react-native';
import {Styles} from '@common';

export default StyleSheet.create({
  title: {
    height: Styles.height * 0.2,
    ...Styles.Common.ColumnCenter,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  generateButton: {
    marginTop: 30,
    width: 300,
    height: 50,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
  },
  QRCodeView: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
