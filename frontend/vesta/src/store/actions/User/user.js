/* eslint-disable */
import axios from 'axios';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router';

import * as actionTypes from '../actionType';

export const saveUserSetting_ = (user) => ({
  type: actionTypes.SAVE_USER_SETTING,
  userID: user.userID,
  username: user.username,
  age: user.age,
  sex: user.sex,
  height: user.height,
  weight: user.weight,
  preference: user.preference,
  targetCalories: user.targetCalories,
});

export const saveUserSetting = (user) => (dispatch) => axios.put('/api/user/profile/',
  {
    username: user.username,
    age: user.age,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    preference: user.preference,
    targetCalories: user.targetCalories,
  })
  .then((res) => {
    dispatch(saveUserSetting_({...res.data}));
  });

export const getUserSetting = () => (dispatch) => axios.get('/api/user/profile/')
  .then((res) => {
    dispatch(saveUserSetting_({...res.data}));
  });

export const deleteUserAccount = () => (dispatch) => axios.delete('/api/user/resign/')
  .then((res) => {
    dispatch(logout());
  });

export const logIn_ = (user) => ({
  type: actionTypes.LOGIN,
  currentUser: user,
});

export const logIn = (info) => (dispatch) => axios.post('/api/user/signin/', info)
  .then((res) => {
    dispatch(logIn_(res.data));
    dispatch(push('/main'));
  }).catch(() => dispatch(push('/login')));

export const signUp = (username, password, age, sex, height, weight, targetCalories) => dispatch => axios.post('/api/user/signup/', {
  username: username,
  password: password,
  age: age,
  sex: sex,
  height: height,
  weight: weight,
  targetCalories: targetCalories})
  .then((res) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    dispatch(push('/login'))
  })

  export const getUserNutrition = (userId) => (dispatch) => { return; }
=======
>>>>>>> develop
  /*alert(`Succesfully Registered!\nYour Target Calorie is set to ${targetCalories}Kcal as recommended generally for your body profile.\nYou can customize your target calorie at the setting page after login.\nWelcome!`);*/
    dispatch(push('/login'));
  });

export const getUserNutrition_ = (userNutrition) => ({
  type: actionTypes.GET_USER_NUTRITION,
  calories: userNutrition.calories,
  carbs: userNutrition.carbs,
  protein: userNutrition.protein,
  fat: userNutrition.fat,
});

export const getUserNutrition = (date) => (dispatch) => axios.get(`/api/nutrition/${date}/`)
  .then((res) => {
    dispatch(getUserNutrition_(res.data));
  });


export const logout_ = () => ({
  type: actionTypes.LOGOUT,
  currentUser: null,
});

export const logout = () => (dispatch) => axios.get('/api/user/signout/')
  .then((res) => {
    dispatch(logout_())
});
<<<<<<< HEAD
=======
>>>>>>> 6182de8d9430e3c854a009749daad57f4d8e55d4
>>>>>>> develop
