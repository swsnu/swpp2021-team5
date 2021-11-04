import * as actionTypes from '../actionType';
import axios from 'axios';

export const getMenu_ = (menu) => {
    return {
        type: actionTypes.GET_MENU,
        selectedMenu: menu
    };
};

export const getMenu = () => {
    return dispatch => {
        return axios.get('/api/menu/<str:menu_name>/')
                    .then( res => dispatch(getMenu_(res.data)))
    };
};