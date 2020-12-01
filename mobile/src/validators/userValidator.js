import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPasswordConfirm,
} from './util';

export const validateCreateUser = ({email, password, name, password2}) => {
  let status = true;
  let message = [];
  if (!isValidName(name)) {
    status = false;
    message.push('Invalid name');
  }
  if (!isValidEmail(email)) {
    status = false;
    message.push('Invalid email');
  }
  if (!isValidPassword(password)) {
    status = false;
    message.push('Invalid password');
  }
  if (!isValidPasswordConfirm(password, password2)) {
    status = false;
    message.push('Invalid confirm password');
  }
  return {status, message};
};

export const validateLogInUser = ({email, password}) => {
  let status = true;
  let message = [];
  if (!isValidEmail(email)) {
    status = false;
    message.push('Invalid email');
  }
  if (!isValidPassword(password)) {
    status = false;
    message.push('Invalid password');
  }
  return {status, message};
};
