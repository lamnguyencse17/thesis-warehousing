import {Styles} from '@common';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centerText: {
    alignItems: 'center',
    position: 'absolute',
    top: 10,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  contentView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontFamily: Styles.FontFamily.QuicksandBold,
  },
  bottomView: {
    width: Styles.width - 60,
    position: 'absolute',
    bottom: 10,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#9ACBF1',
    borderRadius: 24,
    width: Styles.width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  textReactive: {
    fontSize: 16,
    padding: 5,
  },
});
