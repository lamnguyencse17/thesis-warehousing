import {isEmail, isEmpty, isLength, isMongoId} from 'validator';

import {
  UNIT,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  NAME_MAX_LENGTH,
  ASSET_DESCRIPTION_MAX_LENGTH,
  ASSET_NAME_MAX_LENGTH,
} from '../common/Constant';
export const isValidEmail = (email) => {
  return !!email && !isEmpty(email) && isEmail(email);
};

export const isValidPassword = (password) => {
  return (
    !!password &&
    !isEmpty(password) &&
    isLength(password, {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH})
  );
};

export const isValidPasswordConfirm = (password, password2) => {
  return !!password2 && !isEmpty(password2) && password == password2;
};
export const isValidName = (name) => {
  return !!name && !isEmpty(name) && isLength(name, {max: NAME_MAX_LENGTH});
};

export const isValidAssetName = (name) => {
  return (
    !!name && !isEmpty(name) && isLength(name, {max: ASSET_NAME_MAX_LENGTH})
  );
};

export const isValidAssetDescription = (description) => {
  return (
    !!description &&
    !isEmpty(description) &&
    isLength(description, {max: ASSET_DESCRIPTION_MAX_LENGTH})
  );
};

export const isValidQuantity = (quantity) => {
  return !!quantity || quantity > 0;
};

export const isValidUnit = (unit) => {
  return (unit == 0 || !!unit) && unit >= 0 && unit < UNIT.length;
};

export const isValidMongoId = (id) => {
  return !isEmpty(id) && isMongoId(id);
};
