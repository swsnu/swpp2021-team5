import axios from 'axios';
import * as actionTypes from '../actionType';

export const saveUserSetting_ = (user) => ({
  type: actionTypes.SAVE_USER_SETTING,
  user_id: user.user_id,
  username: user.username,
  age: user.age,
  sex: user.sex,
  height: user.height,
  weight: user.weight,
  preference: user.preference,
});

/*                <<Backend API>>                  */
/*            URL:  /api/user/:user_id/profile/   */
/*            json body: like below                */
/*                                                 */
/*                                                 */
export const saveUserSetting = (user) => (dispatch) => axios.put(`/api/user/${user.user_id}/profile/`,
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
