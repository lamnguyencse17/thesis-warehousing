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
    textDecorationLine: 'underline',
  },
  generateButton: {
    height: 40,
    width: (Styles.width * 3) / 4,
    borderRadius: 20,
    backgroundColor: '#9ACBF1',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  QRCodeView: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
