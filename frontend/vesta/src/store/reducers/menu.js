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
    default:
      break;
  }
  return state;
};

export default menuReducer;
