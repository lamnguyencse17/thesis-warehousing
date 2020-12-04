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
  },
  modalView: {
    height: Styles.width / 2,
    width: Styles.width / 2,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
    alignContent: 'center',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
