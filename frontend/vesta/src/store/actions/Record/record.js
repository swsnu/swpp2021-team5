import axios from 'axios';
import * as actionTypes from '../actionType';

export const getRecords_ = (records) => ({
  type: actionTypes.GET_RECORDS,
  records,
});

export const getRecords = (userID) => (dispatch) => axios.get(`/api/record/user/${userID}/`)
  .then((res) => dispatch(getRecords_(res.data)));

export const getRecord_ = (record) => ({
  type: actionTypes.GET_RECORDS,
  record,
});

export const getRecord = (id) => (dispatch) => axios.get(`/api/record/${id}/`)
  .then((res) => dispatch(getRecord_(res.data)));

export const toggleRecord_ = (id) => ({
  type: actionTypes.TOGGLE_LIKED,
  targetID: id,
});

export const toggleRecord = (id) => (dispatch) => axios.put(`/api/record/${id}/liked/`)
  .then(() => dispatch(toggleRecord_(id)));
