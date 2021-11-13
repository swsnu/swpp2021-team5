import axios from 'axios';
import * as actionTypes from '../actionType';

export const getRecords_ = (records) => ({
  type: actionTypes.GET_RECORDS,
  records,
});

export const getRecords = (userID) => (dispatch) => axios.get(`/api/record/user/${userID}/`)
  .then((res) => dispatch(getRecords_(res.data)));

export const getRecord_ = (record) => ({
  type: actionTypes.GET_RECORD,
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

export const getReview_ = (review) => ({
  type: actionTypes.GET_REVIEW,
  selectedReview: review,
});

export const getReview = (recordId) => (dispatch) => axios.get(`/api/record/${recordId}/review/`)
  .then((res) => dispatch(getReview_(res.data)));

export const createReview_ = (review) => ({
  type: actionTypes.CREATE_REVIEW,
  selectedReview: review,
});

export const createReview = (recordId, review) => (dispatch) => axios.post(`/api/record/${recordId}/review/`, review)
  .then((res) => dispatch(createReview_(res.data)));

export const editReview_ = (review) => ({
  type: actionTypes.EDIT_REVIEW,
  selectedReview: review,
});

export const editReview = (recordId, review) => (dispatch) => axios.put(`/api/record/${recordId}/review/`, review)
  .then((res) => dispatch(editReview_(res.data)));

export const deleteReview_ = () => ({
  type: actionTypes.DELETE_REVIEW,
  selectedReview: null,
});

export const deleteReview = (recordId) => (dispatch) => axios.delete(`/api/record/${recordId}/review/`)
  .then(() => dispatch(deleteReview_()));
