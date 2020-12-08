import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  sender: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    flex: 0.2,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
