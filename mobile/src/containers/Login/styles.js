import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: 300,
    backgroundColor: '#465881',
    height: 50,
    marginVertical: 10,
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  inputContainer: {alignContent: 'center', justifyContent: 'center'},
  forgot: {
    padding: 10,
    color: 'white',
    fontSize: 15,
  },
  loginButton: {
    marginTop: 30,
    width: 300,
    height: 50,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
  },
  registerButton: {
    width: 300,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
