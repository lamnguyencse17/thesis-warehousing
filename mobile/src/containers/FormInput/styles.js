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
  itemView: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggleModal: {},
  turnOffModal: {
    fontSize: 16,
    padding: 5,
    color: '#FFF',
  },
  generateButton: {
    height: 40,
    width: Styles.width / 4,
    borderRadius: 20,
    backgroundColor: '#9ACBF1',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonSubmit: {
    height: 40,
    width: Styles.width / 2,
    borderRadius: 20,
    backgroundColor: '#9ACBF1',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
  },
  textReceiver: {
    marginHorizontal: 30,
    marginTop: 5,
  },
});
