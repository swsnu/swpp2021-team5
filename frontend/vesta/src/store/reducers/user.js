import * as actionTypes from '../actions/actionType';

const initialState = {
  currentUser: {
    userID: 1,
    username: 'team5',
    age: 23,
    sex: true,
    height: 170,
    weight: 65,
    preference: ['banana', 'apple', 'fish'],
    target_calories: 2000,
  },
  userNutrition: null,
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
          target_calories: action.target_calories,
        },
      };

    case actionTypes.LOGIN:
      return { ...state, currentUser: action.currentUser };

    default:
      break;
  }
  return state;
};

export default userReducer;
