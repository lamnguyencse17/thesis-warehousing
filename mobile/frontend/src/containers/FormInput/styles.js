import {StyleSheet} from 'react-native';
import {Color, Styles} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    flex: 0.2,
    ...Styles.Common.ColumnCenter,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ReceiverView: {
    flex: 0.2,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'red',
  },
  PackageView: {
    flex: 0.6,
  },
  dataOfPackage: {},
  itemView: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
