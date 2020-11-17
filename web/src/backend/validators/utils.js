import { isEmail, isEmpty, isLength, isInt} from "validator";
import {UNIT} from "../constants/asset";
import {
    PASSWORD_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    ASSET_NAME_MAX_LENGTH,
    ASSET_DESCRIPTION_MAX_LENGTH
  } from "../constants/input";

export const isValidEmail = (email) => {
    return !!email && !isEmpty(email) && isEmail(email);
};

export const isValidPassword = (password) => {
    return !!password && !isEmpty(password) && isLength(password, {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH});
};

export const isValidName = (name) => {
    return !!name && !isEmpty(name) && isLength(name, {max: NAME_MAX_LENGTH});
};

export const isValidAssetName = (name) => {
    return !!name && !isEmpty(name) && isLength(name, {max: ASSET_NAME_MAX_LENGTH});
};

export const isValidAssetDescription = (description) => {
    return !!description && !isEmpty(description) && isLength(description, {max: ASSET_DESCRIPTION_MAX_LENGTH});
};

export const isValidQuantity = (quantity) => {
    return (!!quantity || quantity > 0);
};

export const isValidUnit = (unit) => {
    return (!!unit || unit >= 0) && unit < UNIT.length;
};