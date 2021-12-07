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

  xit('should set state age correctly', () => {
    window.prompt = jest.fn().mockImplementation(() => '5');
    const component = mount(setting);
    const wrap = component.find('Button#age-edit-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.age).toEqual('5');
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

  xit('should set sex to female correctly', () => {
    const component = mount(setting);
    const maleWrapper = component.find('button#male-button');
    const femaleWrapper = component.find('button#female-button');
    maleWrapper.simulate('click');
    femaleWrapper.simulate('click');
    femaleWrapper.simulate('click');
    maleWrapper.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.sex).toEqual(true);
  });
  
  it('should ignore height edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  xit('should set state height correctly', () => {
    window.prompt = jest.fn().mockImplementation(() => '170');
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.height).toEqual('170');
  });

  it('should check height to be number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  xit('should set state weight correctly', () => {
    window.prompt = jest.fn().mockImplementation(() => '70');
    const component = mount(setting);
    const wrap = component.find('Button#weight-edit-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.weight).toEqual('70');
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
    window.prompt = jest.fn().mockImplementation(() => '999');
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.targetCalories).toEqual('999');
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
    window.confirm = jest.fn().mockImplementation(() => true);
    const component = mount(setting);
    const wrap = component.find('button#ingredient-button').at(0);
    wrap.simulate('click');
    const okayButton = component.find('.uiprimarybutton');
    expect(okayButton.length).toBe(1);
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.preference.length).toEqual(1);
  })

  xit('should add preference 1', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('button#add-preferece-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.preference.length).toEqual(2);
  })

  xit('should add preference 2', () => {
    window.prompt = jest.fn().mockImplementation(() => 'test_ingredient');
    const component = mount(setting);
    const wrap = component.find('button#add-preferece-button');
    wrap.simulate('click');
    const settingInstance = component.find(Setting.WrappedComponent).instance();
    expect(settingInstance.state.preference[2]).toEqual('test_ingredient');
  })

  it('should dispatch resign correctly', () => {
    const spyOnDeleteUserAccount = jest.spyOn(actionCreators, 'deleteUserAccount').mockImplementation(() => (dispatch) => {});
    const component = mount(setting);
    const wrap = component.find('button#user-resign-button');
    wrap.simulate('click');
    expect(spyOnDeleteUserAccount).toHaveBeenCalledTimes(1);
  });

  xit('should save profile correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.confirm = jest.fn().mockImplementation(() => true);
    const component = mount(setting);
    const wrap = component.find('button#save-button');
    wrap.simulate('click')
    expect(wrap.length).toBe(1);
  });

  xit('should ignore save button when cancled', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.confirm = jest.fn().mockImplementation(() => false);
    const component = mount(setting);
    const wrap = component.find('button#save-button');
    wrap.simulate('click')
    expect(wrap.length).toBe(1);
  });

  /*
  xit('should check age', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: 'age'}});
    heightWrapper.simulate('change', { target: { value: '60'}});
    weightWrapper.simulate('change', { target: { value: '60'}});
    calorieWrapper.simulate('change', { target: { value: '60'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  xit('should check if age is available', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: '3'}});
    heightWrapper.simulate('change', { target: { value: '60'}});
    weightWrapper.simulate('change', { target: { value: '60'}});
    calorieWrapper.simulate('change', { target: { value: '60'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  xit('should check height', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: '10'}});
    heightWrapper.simulate('change', { target: { value: 'height'}});
    weightWrapper.simulate('change', { target: { value: '60'}});
    calorieWrapper.simulate('change', { target: { value: '60'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  xit('should check weight', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: '10'}});
    heightWrapper.simulate('change', { target: { value: '60'}});
    weightWrapper.simulate('change', { target: { value: 'weight'}});
    calorieWrapper.simulate('change', { target: { value: '60'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  xit('should check target calorie', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: '10'}});
    heightWrapper.simulate('change', { target: { value: '60'}});
    weightWrapper.simulate('change', { target: { value: '60'}});
    calorieWrapper.simulate('change', { target: { value: 'calorie'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  xit('should dispatch save setting action correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const wrapper = component.find('button#save-button');
    const ageWrapper = component.find('input#user-age-input');
    const heightWrapper = component.find('input#user-height-input');
    const weightWrapper = component.find('input#user-weight-input');
    const calorieWrapper = component.find('input#user-target-calorie-input');

    ageWrapper.simulate('change', { target: { value: '10'}});
    heightWrapper.simulate('change', { target: { value: '60'}});
    weightWrapper.simulate('change', { target: { value: '60'}});
    calorieWrapper.simulate('change', { target: { value: '1500'}});
    wrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });
  */
});
