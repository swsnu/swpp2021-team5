/* eslint-disable */
import axios from 'axios';
import { push } from 'connected-react-router';

import * as actionTypes from '../actionType';

/*                <<Backend API>>                  */
/*            URL:  /api/user/profile/   */
/*            json body: like below                */
/*                                                 */
/*                                                 */

export const saveUserSetting_ = (user) => ({
  type: actionTypes.SAVE_USER_SETTING,
  userID: user.userID,
  username: user.username,
  age: user.age,
  sex: user.sex,
  height: user.height,
  weight: user.weight,
  preference: user.preference,
});

export const saveUserSetting = (user) => (dispatch) => axios.put('/api/user/profile/',
  {
    username: user.username,
    age: user.age,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    preference: user.preference,
  })
  .then((res) => {
    dispatch(saveUserSetting_(user));
  });

// json format of this request ?? //
export const getUserSetting = (userID) => (dispatch) => axios.get('/api/user/profile/')
  .then((res) => {
    dispatch(saveUserSetting_({
      ...res.data,
      userId: userID,
    }));
  });

export const deleteUserAccount = (userID) => (dispatch) => axios.delete('/api/user/resign/')
  .then((res) => {
    dispatch({ /*logout action */ })
  })

export const logIn_ = (user) => ({
  type: actionTypes.LOGIN,
  currentUser: user,
});

export const logIn = (info) => (dispatch) => axios.post('/api/user/signin/', info)
  .then((res) => {
    dispatch(logIn_(res.data));
    dispatch(push('/history'));
  }).catch(() => dispatch(push('/history')));
