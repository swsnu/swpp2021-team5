/* eslint-disable */
import axios from 'axios';
import { push } from 'connected-react-router';
import * as actionTypes from '../actionType';

export const logIn_ = (user) => ({
  type: actionTypes.LOGIN,
  currentUser: user,
});

export const logIn = (info) => (dispatch) => axios.get('/api/signin/', info)
  .then((res) => {
    dispatch(logIn_(res.data));
    dispatch(push('/history'));
  }).catch(() => dispatch(push('/history')));
