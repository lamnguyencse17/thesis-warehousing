import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPasswordConfirm,
} from './util';

export const validateCreateUser = ({email, password, name, password2}) => {
  let status = true;
  let message = {name: '', email: '', password: '', password2: ''};
  if (!isValidName(name)) {
    status = false;
    message.name = 'Invalid name';
  }
  if (!isValidEmail(email)) {
    status = false;
    message.email = 'Invalid email';
  }
  if (!isValidPassword(password)) {
    status = false;
    message.password = 'Invalid password';
  }
  if (!isValidPasswordConfirm(password, password2)) {
    status = false;
    message.password2 = 'Invalid confirm password';
  }
  return {status, message};
};

export const validateLogInUser = ({email, password}) => {
  let status = true;
  let message = {email: '', password: ''};
  if (!isValidEmail(email)) {
    status = false;
    message.email = 'Invalid email';
  }
  if (!isValidPassword(password)) {
    status = false;
    message.password = 'Invalid password';
  }
  return {status, message};
};
