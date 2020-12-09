import {StyleSheet} from 'react-native';
import {Styles} from '@common';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  header: {
    flex: 0.1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ReceiverView: {
    marginVertical: 20,
    flex: 0.4,
  },
  AssetView: {
    flex: 0.4,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 18,
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
  buttonSubmit: {
    padding: 10,
    height: 50,
    width: Styles.width / 2,
    borderRadius: 25,
    backgroundColor: '#fb5b5a',
  },
  textReceiver: {
    marginHorizontal: 30,
    marginTop: 5,
  },
  scanButton: {
    marginTop: 30,
    width: 300,
    height: 50,
    backgroundColor: '#003f5c',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
  },
});
