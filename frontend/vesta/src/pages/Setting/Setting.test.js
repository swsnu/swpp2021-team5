import Setting from './Setting';

import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../../test-utils/mock';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/User/user';

const userInitialState = {
    user: null,
    currentUser: {
      userID: 1,
      username: 'testname',
      age: 1,
      sex: true,
      height: 1,
      weight: 1,
      preference: ['banana', 'apple'],
    },
    userNutrition: null,
};
const recordInitialState = {

};
const menuInitialState = {

};
const recipeInitialState = {

};
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('Setting', () => {
    let setting;

    beforeEach(() => {
        setting = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Setting} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })
    afterEach(() => {
        jest.clearAllMocks();
    })


    it('should render Setting', () => {
        const component = mount(setting);
        const wrapper = component.find('.Setting');
        expect(wrapper.length).toBe(1);
    })

    it('should set state age correctly', () => {
        const component = mount(setting);
        const wrap = component.find('input').at(0);
        wrap.simulate('change', {target: {value: 2}});
        const settingInstance = component.find(Setting.WrappedComponent).instance();
        expect(settingInstance.state.age).toEqual(2);
    })

    it('should set state sex correctly', () => {
        const component = mount(setting);
        const wrap = component.find('input').at(1);
        wrap.simulate('change', {target: {value: false}});
        const settingInstance = component.find(Setting.WrappedComponent).instance();
        expect(settingInstance.state.sex).toEqual(false);
    })

    it('should set state height correctly', () => {
        const component = mount(setting);
        const wrap = component.find('input').at(2);
        wrap.simulate('change', {target: {value: 2}});
        const settingInstance = component.find(Setting.WrappedComponent).instance();
        expect(settingInstance.state.height).toBe(2);
    })

    it('should set state weight correctly', () => {
        const component = mount(setting);
        const wrap = component.find('input').at(3);
        wrap.simulate('change', {target: {value: 2}});
        const settingInstance = component.find(Setting.WrappedComponent).instance();
        expect(settingInstance.state.weight).toBe(2);
    })

    it('should dispatch resign correctly', () => {
        const spyOnDeleteUserAccount = jest.spyOn(actionCreators, 'deleteUserAccount').mockImplementation(userID => { return dispatch => {}; });
        const component = mount(setting);
        const wrap = component.find('button').at(1);
        wrap.simulate('click');
        expect(spyOnDeleteUserAccount).toHaveBeenCalledTimes(1);
    })

    it('should dispatch resign correctly', () => {
        const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting').mockImplementation(({}) => { return dispatch => {}; });
        const component = mount(setting);
        console.log(component.debug());
        const wrap = component.find('button').at(0);
        wrap.simulate('click');
        expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
    })

    it('should dispatch resign correctly', () => {
        const spyOnGetUserSetting = jest.spyOn(actionCreators, 'getUserSetting').mockImplementation((userID) => { return dispatch => {}; });
        const component = mount(setting);
        expect(spyOnGetUserSetting).toHaveBeenCalledTimes(1);
    })
})
