import axios from 'axios';
import * as actionTypes from '../actionType';

export const detect_ = (menu) => ({
  type: actionTypes.DETECT,
  detectedMenu: menu,
});

export const detect = (formData) => (dispatch) => axios.post('/api/ml/detection/', formData)
  .then((res) => dispatch(detect_(res.data)));
