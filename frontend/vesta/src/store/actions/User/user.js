import axios from 'axios'
import * as actionTypes from '../actionType';

export const saveUserSetting_ = (user) => {
  return {
    type: actionTypes.SAVE_USER_SETTING,
    user_id: user.user_id,
    username: user.username,
    age: user.age,
    sex: user.sex,
    height: user.height,
    weight: user.weight,
    preference: user.preference,
  }
}

export const saveUserSetting = (user) => {
  return (dispatch) => {

    /*                <<Backend API>>                  */
    /*            URL:  /api/user/:user_id/profile/   */
    /*            json body: like below                */
    /*                                                 */
    /*                                                 */
    return axios.put('/api/user/'+user.user_id+'/profile/',
    {
      username: user.username,
      age: user.age,
      sex: user.sex,
      height: user.height,
      weight: user.weight,
      preference: user.preference,
    })
      .then(res => {
        dispatch(saveUserSetting_(user))
      })
  };
};