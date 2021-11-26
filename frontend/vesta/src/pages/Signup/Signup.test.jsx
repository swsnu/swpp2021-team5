/* eslint-disable */
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Signup from './Signup';
import { getMockStore } from '../../../test-utils/mock';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/User/user';
import { isNumeric } from './Signup';

const userInitialState = {
  currentUser: {
    userID: 1,
    username: 'testname',
    age: 1,
    sex: true,
    height: 1,
    weight: 1,
    targetCalories: 1,
    preference: ['banana'],
  },
  userNutrition: null,
};
const recordInitialState = {};
const menuInitialState = {};
const recipeInitialState = {};
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('Signup', () => {
  let signup;

  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Signup} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render component well', () => {
    const component = mount(signup);
    const wrapper = component.find('.Signup');
    expect(wrapper.length).toBe(1);
  })

  it('should check username', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const wrapper = component.find('button#register-button');
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })

  it('should check password input', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  });

  it('should check if confirpassword is equal to password', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'passwd'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  });

  it('should check if age is entered', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })
  
  it('should check if age is numeric', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: 'age'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })

  it('should check if age is available', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '4'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })

  /*
  it('should check height', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '5'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  });
  */

  
  it('should check if height is numeric', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const heightWrapper = component.find('#height-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '5'}});
    heightWrapper.simulate('change', { target: { value: 'height'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  });

  /*
  it('should check weight', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const heightWrapper = component.find('#height-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '5'}});
    heightWrapper.simulate('change', { target: { value: '170'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })*/

  
  it('should check if weight is numeric', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const heightWrapper = component.find('#height-input');
    const weightWrapper = component.find('#weight-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '5'}});
    heightWrapper.simulate('change', { target: { value: '170'}});
    weightWrapper.simulate('change', { target: { value: 'weight'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(0);
  })

  
  it('should dispatch register action', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const usernameWrapper = component.find('#username-input');
    const passwordWrapper = component.find('#password-input');
    const confirmPasswordWrapper = component.find('#confirm-password-input');
    const ageWrapper = component.find('#age-input');
    const heightWrapper = component.find('#height-input');
    const weightWrapper = component.find('#weight-input');
    const wrapper = component.find('button#register-button');

    usernameWrapper.simulate('change', { target: { value: 'testname'}});
    passwordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    confirmPasswordWrapper.simulate('change', { target: { value: 'testpasswd'}});
    ageWrapper.simulate('change', { target: { value: '5'}});
    heightWrapper.simulate('change', { target: { value: '170'}});
    weightWrapper.simulate('change', { target: { value: '180'}});
    wrapper.simulate('click');
    expect(spyOnRegister).toHaveBeenCalledTimes(1);
  })

  it('should set state.sex stay on clicked', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const maleButtonWrapper = component.find('button#male-button');

    maleButtonWrapper.simulate('click');
    const signupInstance = component.find(Signup.WrappedComponent).instance();
    expect(signupInstance.state.sex).toBe(true);
  })

  it('should alter state.sex on clicked', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const femaleButtonWrapper = component.find('button#female-button');

    femaleButtonWrapper.simulate('click');
    const signupInstance = component.find(Signup.WrappedComponent).instance();
    expect(signupInstance.state.sex).toBe(false);
  })

  it('should alter state.sex on clicked again', () => {
    const spyOnRegister = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation(() => dispatch => {});
    const component = mount(signup);
    const maleButtonWrapper = component.find('button#male-button');
    const femaleButtonWrapper = component.find('button#female-button');

    femaleButtonWrapper.simulate('click');
    femaleButtonWrapper.simulate('click');
    maleButtonWrapper.simulate('click');
    const signupInstance = component.find(Signup.WrappedComponent).instance();
    expect(signupInstance.state.sex).toBe(true);
  })

  it('isNumeric function should be correct', () => {
    expect(isNumeric(1)).toBe(false);
    expect(isNumeric('123.123')).toBe(true);
  })
})