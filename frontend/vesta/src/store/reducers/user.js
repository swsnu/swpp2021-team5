import * as actionTypes from '../actions/actionType';

const initialState = {
  currentUser: null,
  userNutrition: null,
  userNutritions: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_SETTING:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          username: action.username,
          age: action.age,
          sex: action.sex,
          height: action.height,
          weight: action.weight,
          preference: action.preference,
          targetCalories: action.targetCalories,
        },
      };

    case actionTypes.LOGIN:
      // console.log('[USER]reducer:login');
      console.log('[USER]');
      console.log(action.currentUser);
      return { ...state, currentUser: action.currentUser };

    case actionTypes.GET_USER_NUTRITION:
      return {
        ...state,
        userNutrition: {
          calories: action.calories,
          carbs: action.carbs,
          protein: action.protein,
          fat: action.fat,
          count_all: action.count_all,
        }
      };

    case actionTypes.CREATE_USER_NUTRITION:
      return {
        ...state,
        userNutrition: {
          calories: action.calories,
          carbs: action.carbs,
          protein: action.protein,
          fat: action.fat,
          count_all: action.count_all,
        }
      };

    case actionTypes.EDIT_USER_NUTRITION:
      return {
        ...state,
        userNutrition: {
          calories: action.calories,
          carbs: action.carbs,
          protein: action.protein,
          fat: action.fat,
          count_all: action.count_all,
        }
      };

    case actionTypes.LOGOUT:
      return { ...state, currentUser: action.currentUser };

    case actionTypes.GET_ALL_USER_NUTRITION:
      return { ...state, userNutritions: action.userNutritions };

    default:
      break;
  }
  return state;
};

export default userReducer;
