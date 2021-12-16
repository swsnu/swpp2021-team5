import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from '../actionType';

export const detect_ = (menu) => ({
  type: actionTypes.DETECT,
  detectedMenu: menu,
});

export const detect = (formData) => (dispatch) => axios.post('/api/ml/detection/', formData)
  .then((res) => {
    console.log(res);
    dispatch(detect_(res.data));
  }).catch((res) => {
    console.log(res);
  });
