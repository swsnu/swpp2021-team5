/* eslint-disable */
import * as actionTypes from '../actions/actionType';

const initialState = {
  userRecords: [
    {
      id: 1,
      image: "/sushi_example_image.jpeg",
      date: "2021/11/09",
      liked: true,
      review: null,
    },
    {
      id: 2,
      image: "/chicken_sample_image.jpeg",
      date: "2021/11/08",
      liked: false,
      review: null,
    },
    {
      id: 3,
      image: "/pasta_sample_image.jpeg",
      date: "2021/11/07",
      liked: true,
      review: null,
    },
  ],
  selectedRecord: {
    id: 1,
    date: "2021/11/09",
    liked: true,
    review: "My favorite Dish",
  },
  selectedReview: null,
};
const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECORDS: {
      return { ...state, userRecords: action.records };
    }
    case actionTypes.TOGGLE_LIKED: {
      const toggledRecords = state.userRecords.map((rec) => {
        if (rec.id === action.targetID) {
          return { ...rec, liked: !rec.liked };
        } return { ...rec };
      });
      return { ...state, userRecords: toggledRecords };
    }
    case actionTypes.GET_RECORD: {
      return { ...state, selectedRecord: action.record };
    }
    case actionTypes.GET_REVIEW: {
      return { ...state, selectedReview: action.selectedReview };
    }
    case actionTypes.CREATE_REVIEW: {
      return { ...state, selectedReview: action.selectedReview };
    }
    case actionTypes.EDIT_REVIEW: {
      return { ...state, selectedReview: action.selectedReview };
    }
    case actionTypes.DELETE_REVIEW: {
      return { ...state, selectedReview: action.selectedReview };
    };
    default: {
      break;
    }
  }
  return state;
};

export default recordReducer;
