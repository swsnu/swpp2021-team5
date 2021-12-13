/* eslint-disable */
import { toggleRecord } from '../actions';
import * as actionTypes from '../actions/actionType';

const initialState = {
  userRecords: null,
  selectedRecord: null,
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
      let toggledRecord = state.selectedRecord;
      // if (state.selectedRecord !== null && action.targetID === state.selectedRecord.id) {
      //   toggledRecord = state.userRecords.find((rec) => rec.id === action.targetID);
      // }
      return { ...state, userRecords: toggledRecords, selectedRecord: toggledRecord };
    }
    case actionTypes.ADD_RECORD: {
      const newRecord = {
        id: action.id, image: action.image, date: action.date,
        liked: action.liked, review: action.review
      };
      console.log(newRecord);
      return state;
      // return { ...state, userRecords: state.userRecords.push(newRecord)};
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
