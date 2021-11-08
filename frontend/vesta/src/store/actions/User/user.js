import axios from 'axios';
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
    dispatch(saveUserSetting_(
      res.data,
    ));
  });
