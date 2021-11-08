import * as actionTypes from '../actions/actionType';

const initialState = {
  user: null,
  currentUser: {
    userID: null,
    username: null,
    age: null,
    sex: null,
    height: null,
    weight: null,
    preference: [],
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
        },
      };

    default:
      break;
  }
  return state;
};

export default userReducer;
