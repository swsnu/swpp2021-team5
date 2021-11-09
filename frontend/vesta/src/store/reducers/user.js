import * as actionTypes from '../actions/actionType';

const initialState = {
  user: null,
  currentUser: null,
  userNutrition: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, currentUser: action.currentUser };
    default:
      break;
  }
  return state;
};

export default userReducer;
