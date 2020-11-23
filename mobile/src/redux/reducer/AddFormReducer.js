import {ADD_FORM_PACKAGE, ADD_FORM_RECEIVER} from '../type';

const initialState = {
  packageData: [],
  receiverData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FORM_RECEIVER:
      return {
        ...state,
        receiverData: action.payload,
      };
    case ADD_FORM_PACKAGE:
      return {
        ...state,
        packageData: [...state.packageData, action.payload],
      };
    default:
      return state;
  }
}
