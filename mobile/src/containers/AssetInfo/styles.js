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
  inputView: {
    height: Styles.height * 0.5,
  },
  pickerView: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  pickerTitle: {
    fontSize: Styles.FontSize.big,
    alignSelf: 'flex-start',
  },
  picker: {
    width: Styles.width - 20,
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
