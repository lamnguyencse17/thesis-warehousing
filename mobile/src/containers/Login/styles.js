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
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
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
