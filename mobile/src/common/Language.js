import LocalizedStrings from 'react-native-localization';

export default new LocalizedStrings({
  en: {
    login: {
      login: 'LOGIN',
      remmeber_me: 'Remember me',
      login_with_another_api: 'You can also login with …',
      not_registered: 'Not registered yet?',
      signup: ' Sign up!',
      loginRontEmail: 'Your email is not registered',
      loginRontPass: 'Your password is not match',
      missEmail: 'Please fill your email',
      missPass: 'Please fill your password',
    },
    signup: {
      signup: 'SIGN UP',
    },
    AssetInfo: {
      name: 'Name',
      placeholder: 'Text here',
      quantity: 'Quantity',
      unit: 'Unit',
      description: 'Description',
      title: 'Create Asset',
    },
  },
});
