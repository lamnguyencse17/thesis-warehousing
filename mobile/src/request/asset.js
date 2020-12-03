import axios from 'axios';
import {Config} from '@common';

export const getAssetRequest = async (assetId) => {
  // use process.env in the feature for BACKEND_API please!
  const requestUrl = `http://localhost:3000/api/assets/${assetId}`;
  // format: {
  //     "_id": "5fb412288173b602387d876a",
  //     "assets": [
  //         {
  //             "_id": "5fb392d6dab9670184275ece",
  //             "name": "Thung Tao"
  //         }
  //     ],
  //     "receiver": {
  //         "_id": "5fb411df8173b602387d8768",
  //         "name": "Lam Nguyen"
  //     },
  //     "sender": {
  //         "_id": "5fb411eb8173b602387d8769",
  //         "name": "Lam Nguyen"
  //     },
  //     "__v": 0
  // }
  // STATUS IS FOR HANDLING RETURN FROM AXIOS
  try {
    const res = await axios.get(requestUrl);
    return {status: true, asset: res.data};
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const createAssetRequest = async ({
  name,
  quantity,
  unit,
  description,
}) => {
  const requestUrl = `${Config.server}assets/`;
  // format:
  // {
  //     "assets": [
  //         "5fb392d6dab9670184275ece"
  //     ],
  //     "_id": "5fb4b186a2c7d1020db16ea4",
  //     "receiver": "5fb411df8173b602387d8768",
  //     "sender": "5fb411eb8173b602387d8770",
  //     "__v": 0
  // }
  try {
    const res = await axios.post(requestUrl, {assets: [{name,
      quantity,
      unit,
      description,}]
    });
    return {status: true, assets: res.data};
  } catch (err) {
    console.log(err.response.data.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
