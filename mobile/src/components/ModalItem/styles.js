import {StyleSheet} from 'react-native';
import {Styles} from '@common';
export default StyleSheet.create({
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
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    marginRight: (Styles.width - 160) / 2,
  },
  assetButton: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
});
