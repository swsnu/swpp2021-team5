/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  selectedMenu: null,
  // {
  //   name: 'Oatmeal',
  //   calories: 404,
  //   carbs: 60,
  //   protein: 22,
  //   fat: 16,
  //   recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
  // },
  allMenus: null,
  recommendedMenus: null,
  count: -1,
  isUpdated: false,
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENU:
      return { ...state, selectedMenu: action.selectedMenu };
    case actionTypes.GET_RECOMMENDED_MENUS:
      return { ...state, recommendedMenus: action.recommendedMenus };
    case actionTypes.GET_COUNT_ALL:
      console.log(state.count);
      if (state.count !== action.countAll.count_all){
        return { ...state, count: action.countAll.count_all, isUpdated: true };
      } else {
        return { ...state, isUpdated: false };
      }
    default:
      break;
  }
  return state;
};

export default menuReducer;
