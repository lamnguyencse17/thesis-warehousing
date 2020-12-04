import {StyleSheet} from 'react-native';
import {Styles} from '@common';

export default StyleSheet.create({
  header: {
    height: Styles.height * 0.2,
    ...Styles.Common.ColumnCenter,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemView: {
    width: Styles.width - 80,
    alignSelf: 'center',
    height: Styles.height * 0.05,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    alignContent: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  textItem: {
    fontSize: 16,
  },
});
