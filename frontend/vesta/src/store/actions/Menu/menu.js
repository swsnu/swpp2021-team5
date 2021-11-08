import axios from 'axios';
import * as actionTypes from '../actionType';

export const getMenu_ = (menu) => ({
  type: actionTypes.GET_MENU,
  selectedMenu: menu,
});

export const getMenu = (menuName) => (dispatch) => axios.get(`/api/menu/${menuName}/`)
  .then((res) => dispatch(getMenu_(res.data)));
