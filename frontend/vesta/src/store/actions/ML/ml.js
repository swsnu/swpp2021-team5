import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from '../actionType';

export const detect_ = (menu) => ({
  type: actionTypes.DETECT,
  detectedMenu: menu.recognition_results,
  nutrition: menu.nutritional_info,
  ingredients: menu.ingredients
});

export const detect = (formData) => (dispatch) => axios.post('/api/ml/detection/', formData)
  .then((res) => {
    console.log(res);
    console.log(res.data);
    console.log(res.data.recognition_results);
    dispatch(detect_(res.data));
  }).catch((res) => {
    console.log(res);
  });
