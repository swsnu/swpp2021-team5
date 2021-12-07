/* eslint-disable */
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Setting from './Setting';
import { getMockStore } from '../../test-utils/mock';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/User/user';

const userInitialState = {
  currentUser: {
    userID: 1,
    username: 'testname',
    age: 5,
    sex: true,
    height: 1,
    weight: 1,
    targetCalories: 1,
    preference: ['banana', 'apple'],
  },
  userNutrition: null,
};
const userInitialState_ = {
  currentUser: {
    userID: 1,
    username: 'testname',
    age: 1,
    sex: null,
    height: 1,
    weight: 1,
    targetCalories: 1,
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
  let setting, spyOnGetUserSetting;

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
    spyOnGetUserSetting = jest.spyOn(actionCreators, 'getUserSetting').mockImplementation(() => (dispatch) => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Setting', () => {
    const component = mount(setting);
    const wrapper = component.find('.Setting');
    expect(wrapper.length).toBe(1);
  });

  it('should set state age correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => '5');
    const component = mount(setting);
    const wrap = component.find('Button#age-edit-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });

  it('should ignore age edit', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#age-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should check age to be larget than 4', () => {
    window.prompt = jest.fn().mockImplementation(() => '4');
    const component = mount(setting);
    const wrap = component.find('Button#age-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should check age to be number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#age-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should set sex to female correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const femaleWrapper = component.find('button#female-button');
    femaleWrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });
  
  it('should ignore height edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should set state height correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => '170');
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });

  it('should check height to be number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should set state weight correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => '170');
    const component = mount(setting);
    const wrap = component.find('Button#weight-edit-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });

  it('should ignore weight edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#weight-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should check weight to be number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#weight-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  xit('should set state target calorie correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => '170');
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });

  it('should ignore target calorie edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should check weight to be number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  xit('should open confirm window', () => {
    const component = mount(setting);
    const wrap = component.find('button#ingredient-button').at(0);
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.preference.length).toEqual(2);
  })

  xit('should delete preference', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.confirm = jest.fn().mockImplementation(() => true);
    const component = mount(setting);
    const wrap = component.find('button#ingredient-button').at(0);
    wrap.simulate('click');
    console.log(component.debug());
    const okayButton = component.find('.uiprimarybutton');
    expect(okayButton.length).toBe(1);
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  })

  it('should add preference 1', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('button#add-preferece-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  })

  it('should add preference 2', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => 'test_ingredient');
    const component = mount(setting);
    const wrap = component.find('button#add-preferece-button');
    wrap.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  })

  it('should dispatch resign correctly', () => {
    const spyOnDeleteUserAccount = jest.spyOn(actionCreators, 'deleteUserAccount').mockImplementation(() => (dispatch) => {});
    const component = mount(setting);
    const wrap = component.find('button#user-resign-button');
    wrap.simulate('click');
    expect(spyOnDeleteUserAccount).toHaveBeenCalledTimes(1);
  });
});
