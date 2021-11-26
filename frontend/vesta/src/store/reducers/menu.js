/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: null,
  count: -1,
  countAll: 0,
  isUpdated: false,
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU:
      return { ...state, selectedMenu: action.selectedMenu };
    case actionTypes.GET_RECOMMENDED_MENUS:
      return { ...state, recommendedMenus: action.recommendedMenus };
    case actionTypes.GET_COUNT_ALL:
      if (state.count !== action.countAll.count_all){
        console.log('Here');
        return { ...state, numCountAll: action.countAll.count_all, count: action.countAll.count_all, isUpdated: true };
      } else {
        console.log('here');
        return { ...state, isUpdated: false };
      }
    default:
      break;
  }
  return state;
};

export default menuReducer;
