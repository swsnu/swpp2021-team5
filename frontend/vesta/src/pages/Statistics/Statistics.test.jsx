import { mount, shallow } from 'enzyme';
import Statistics from './Statistics';

describe('Statistics', () => {
  let statistics;
  statistics = <Statistics />;

  xit('should render Statistics', () => {
    const component = mount(statistics);
    const wrapper = component.find('.Statistics');
    expect(wrapper.length).toBe(1);
  });
});

import Statistics from './Statistics';

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
  currentUser: {
    userID: 1,
    username: 'testname',
    age: 1,
    sex: true,
    height: 1,
    weight: 1,
    targetCalories: 1,
    preference: ['banana', 'apple'],
  },
  userNutrition: {
      calories: 1,
      carbs: 1,
      protein: 1,
      fat: 1,
  },
};
const recordInitialState = {

};
const menuInitialState = {

};
const recipeInitialState = {

};
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('Statistics', () => {
  let statistics, spyOnGetUserNutrition;

  beforeEach(() => {
    statistics = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Statistics} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyOnGetUserNutrition = jest.spyOn(actionCreators, 'getUserNutrition')
      .mockImplementation(() => (dispatch) => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Statistics', () => {
    const component = mount(statistics);
    const wrapper = component.find('.Statistics')
    expect(wrapper.length).toBe(1);
  });

  it('should render all tabs well', () => {
    const component = mount(statistics);
    const wrapper_week = component.find('a').at(1);
    wrapper_week.simulate('click');
    expect(wrapper_week.length).toBe(1);
    const wrapper_month = component.find('a').at(2);
    wrapper_month.simulate('click');
    expect(wrapper_month.length).toBe(1);
  });

  it('should handler on button click', () => {
    const component = mount(statistics);
    const wrapper_week = component.find('a').at(1);
    wrapper_week.simulate('click');
    const prevButton = component.find('button#weekly-prev-button');
    prevButton.simulate('click');
    expect(prevButton.length).toBe(1);
    const nextButton = component.find('button#weekly-next-button');
    nextButton.simulate('click');
    expect(nextButton.length).toBe(1);
  })
})
