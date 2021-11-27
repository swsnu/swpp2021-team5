import axios from 'axios';
import * as actionTypes from '../actionType';

export const getMenu_ = (menu) => ({
  type: actionTypes.GET_MENU,
  selectedMenu: menu,
});

export const getMenu = (menuName) => (dispatch) => axios.get(`/api/menu/${menuName}/`)
  .then((res) => dispatch(getMenu_(res.data)));

export const getRecommendedMenus_ = (menu) => ({
  type: actionTypes.GET_RECOMMENDED_MENUS,
  recommendedMenus: menu,
});

export const getRecommendedMenus = (date) => (dispatch) => axios.get(`/api/recommend/${date}/`)
  .then((res) => dispatch(getRecommendedMenus_(res.data)));

export const updateSelectedMenu_ = (when, idx) => ({
  type: actionTypes.UPDATE_SELECTED_MENU,
  when,
  idx,
});
