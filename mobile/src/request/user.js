import {Config} from '@common';
import axios from 'axios';

export const createLoginRequest = async ({email, password}) => {
  const requestUrl = `${Config.server}auth/login`;
  try {
    const res = await axios.post(requestUrl, {email, password});
    return {status: true, token: res.data};
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const getUserRequest = () => {
  return axios
    .get(`${Config.server}user`)
    .then((res) => {
      return {status: true, userData: res.data};
    })
    .catch((err) => {
      return {
        status: false,
        errCode: err.response.status,
        message: err.response.data.message,
      };
    });
};

export const createRegisterRequest = async ({name, email, password}) => {
  const requestUrl = `${Config.server}/auth/register`;
  try {
    await axios.post(requestUrl, {name, email, password});
    return {status: true};
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
