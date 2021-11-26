/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: null,
  count: 0,
  countAll: 0,
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU:
      return { ...state, selectedMenu: action.selectedMenu };
    case actionTypes.GET_RECOMMENDED_MENUS:
      return { ...state, recommendedMenus: action.recommendedMenus };
    case actionTypes.GET_COUNT_ALL:
      return { ...state, numCountAll: action.countAll };
    case actionTypes.CHANGE_COUNT:
      return { ...state, count: action.count };
    default:
      break;
  }
  return state;
};

export default menuReducer;
