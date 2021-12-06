import axios from 'axios';
import * as actionTypes from '../actionType';

export const detect_ = (menu) => ({
  type: actionTypes.DETECT,
  detectedMenu: menu,
});

export const detect = (formData) => (dispatch) => axios.post('/api/ml/detection/', formData)
  .then((res) => {
    for (const key of formData.keys()) {
      console.log(key);
    }
    dispatch(detect_(res.data));
  }).catch(() => {
    for (const key of formData.keys()) {
      console.log(key);
    }
    for (const value of formData.values()) {
      console.log(value);
    }
  });
