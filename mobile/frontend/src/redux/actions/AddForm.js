import {ADD_FORM_PACKAGE, ADD_FORM_RECEIVER} from '../type';

export const addFormReceiver = (data) => (dispatch) => {
  return dispatch({
    type: ADD_FORM_RECEIVER,
    payload: data,
  });
};

export const addFormPackage = (data) => (dispatch) => {
  return dispatch({
    type: ADD_FORM_PACKAGE,
    payload: data,
  });
};
