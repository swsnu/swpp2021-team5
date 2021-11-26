/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: null,
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU:
      return { ...state, selectedMenu: action.selectedMenu };
    case actionTypes.GET_RECOMMENDED_MENUS:
      return { ...state, recommendedMenus: action.recommendedMenus };
    case actionTypes.UPDATE_SELECTED_MENU: {
      const selected = state.recommendedMenus[action.when][action.idx];
      // eslint-disable-next-line
      console.log(selected);
      return { ...state, selectedMenu: selected };
    }
    default:
      break;
  }
  return state;
};

export default menuReducer;
