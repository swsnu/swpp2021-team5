import axios from 'axios';
import * as actionTypes from '../actionType';

export const getMenu_ = (menu) => ({
  type: actionTypes.GET_MENU,
  selectedMenu: menu,
});

export const getMenu = () => (dispatch) => axios.get('/api/menu/<str:menu_name>/')
  .then((res) => dispatch(getMenu_(res.data)));
