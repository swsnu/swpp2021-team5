import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../../test-utils/mock';
import { history } from '../../store/store';
import Main from './Main';

const userInitialState = {};
const recordInitialState = {};
const menuInitialState = {};
const recipeInitialState = {};

let main;
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('<Main />', () => {
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Main} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    const component = mount(main);
    const wrapper = component.find('Main');
    expect(wrapper.length).toBe(1);
  });

  xit('should handle not followed recommendation button click', () => {
    const component = mount(main);
    component.find('button#not-followed-recommendation-button').simulate('click');
    expect(history.location.pathname).toBe('/record');
    // component.unmount();
  });

  xit('should handle followed recommendation button click', () => {
    const component = mount(main);
    component.find('button#followed-recommendation-button').simulate('click');
    expect(history.location.pathname).toBe('/record');
    component.unmount();
  });

  xit('should handle record snack button click', () => {
    const component = mount(main);
    component.find('button#record-snack-button').simulate('click');
    expect(history.location.pathname).toBe('/record');
    component.unmount();
  });

  xit('should handle menu recommendation button click', () => {
    const component = mount(main);
    component.find('button').at(0).simulate('click');
    expect(history.location.pathname).toBe('/recommendation');
    component.unmount();
  });

  xit('should handle past meal record button click', () => {
    const component = mount(main);
    component.find('button#past-meal-record-buton').simulate('click');
    expect(history.location.pathname).toBe('/history');
    component.unmount();
  });

})