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
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  inputContainer: {alignContent: 'center', justifyContent: 'center'},
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 30,
    width: 300,
    height: 50,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
  },
  loginButton: {
    width: 300,
    height: 50,
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
  },
});
