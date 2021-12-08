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
import recommendedCalorie from './Calculator'

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
const userInitialState_null = {
  currentUser: null,
  userNutrition: null,
};
const userInitialState_female = {
  currentUser: {
    userID: 1,
    username: 'testname',
    age: 5,
    sex: false,
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
const mockStore_null = getMockStore(userInitialState_null, recordInitialState, menuInitialState, recipeInitialState);
const mockStore_female = getMockStore(userInitialState_female, recordInitialState, menuInitialState, recipeInitialState);

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

  it('should ignore to edit sex from male to male', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting);
    const femaleWrapper = component.find('button#male-button');
    femaleWrapper.simulate('click');
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(0);
  });

  it('should set sex from female to male correctly', () => {
    let setting_female = (
      <Provider store={mockStore_female}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Setting} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let spyOnGetUserSetting = jest.spyOn(actionCreators, 'getUserSetting').mockImplementation(() => (dispatch) => {});
    const spyOnSaveUserSetting_female = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting_female);
    const femaleWrapper = component.find('button#male-button');
    femaleWrapper.simulate('click');
    expect(spyOnSaveUserSetting_female).toHaveBeenCalledTimes(1);
  });

  it('should ignore to edit sex from female to female', () => {
    let setting_female = (
      <Provider store={mockStore_female}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Setting} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let spyOnGetUserSetting= jest.spyOn(actionCreators, 'getUserSetting').mockImplementation(() => (dispatch) => {});
    const spyOnSaveUserSetting_female = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    const component = mount(setting_female);
    const femaleWrapper = component.find('button#female-button');
    femaleWrapper.simulate('click');
    expect(spyOnSaveUserSetting_female).toHaveBeenCalledTimes(0);
  });
  
  it('should ignore height edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => null);
    const component = mount(setting);
    const wrap = component.find('Button#height-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
  });

  it('should check if height is number', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
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

  it('should set state target calorie correctly', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    window.prompt = jest.fn().mockImplementation(() => '170');
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toBe(1);
    expect(spyOnSaveUserSetting).toHaveBeenCalledTimes(1);
  });

  it('should ignore target calorie edit when cancle', () => {
    window.prompt = jest.fn().mockImplementation(() => 'asdf');
    const component = mount(setting);
    const wrap = component.find('Button#target-calorie-edit-button');
    wrap.simulate('click');
    expect(wrap.length).toEqual(1);
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

  it('should delete preference', () => {
    const spyOnSaveUserSetting = jest.spyOn(actionCreators, 'saveUserSetting')
      .mockImplementation(({}) => (dispatch) => {});
    // window.confirm = jest.fn().mockImplementation(() => true);
    const component = mount(setting);
    const wrap = component.find('button#ingredient-button').at(0);
    wrap.simulate('click');
    // console.log(component.debug());
    const okayButton = component.find('.uiprimarybutton');
    expect(wrap.length).toBe(1);
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

  it('should not dispatch resign correctly', () => {
    window.confirm = jest.fn().mockImplementation(() => false);
    const spyOnDeleteUserAccount = jest.spyOn(actionCreators, 'deleteUserAccount').mockImplementation(() => (dispatch) => {});
    const component = mount(setting);
    const wrap = component.find('button#user-resign-button');
    wrap.simulate('click');
    expect(spyOnDeleteUserAccount).toHaveBeenCalledTimes(0);
  });

  it('should dispatch resign correctly', () => {
    window.confirm = jest.fn().mockImplementation(() => true);
    const spyOnDeleteUserAccount = jest.spyOn(actionCreators, 'deleteUserAccount').mockImplementation(() => (dispatch) => {});
    const component = mount(setting);
    const wrap = component.find('button#user-resign-button');
    wrap.simulate('click');
    expect(spyOnDeleteUserAccount).toHaveBeenCalledTimes(1);
  });

  it('should check if it is not logged in', () => {
    let setting_null = (
      <Provider store={mockStore_null}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Setting} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let spyOnGetUserSetting_null = jest.spyOn(actionCreators, 'getUserSetting').mockImplementation(() => (dispatch) => {});
    const component = mount(setting_null);
    const wrapper = component.find('.SettingPage');
    expect(wrapper.length).toBe(1);
  })
});
