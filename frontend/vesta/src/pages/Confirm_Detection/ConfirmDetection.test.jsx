import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mock';
import { history } from '../../store/store';
import ConfirmDetection from './ConfirmDetection';

const userInitialState = {};
const recordInitialState = {};
const menuInitialState = {};
const recipeInitialState = {};
const mlInitialState = {};

let confirmDetection;
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState, mlInitialState);

describe('<ConfirmDetection />', () => {
  beforeEach(() => {
    confirmDetection = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ConfirmDetection} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  xit('should render without errors', () => {
    const component = mount(confirmDetection);
    const wrapper = component.find('ConfirmDetection');
    expect(wrapper.length).toBe(1);
  });

  xit('should handle review creation', () => {
    const component = mount(confirmDetection);
    component.find('textarea#review-text').simulate('change', { target: { value: 'test_review' } });
    const wrapper = component.find(ConfirmDetection).instance();
    expect(wrapper.state.review).toEqual('test_review');
  });

  /*
  it('should handle edit result button click', () => {
    const component = mount(confirmDetection);
    component.find('button#edit-result-button').simulate('click');
    component.find('prompt').simulate('change', { target: {value: 'test_menuname' } });
    const wrapper = component.find(ConfirmDetection).instance();
    expect(wrapper.state.menuName).toEqual('Burger');
  })
  */

  xit('should handle menuName change', () => {
    const component = mount(confirmDetection);
    const wrapper = component.find(ConfirmDetection).instance();
    wrapper.setState({ menuName: 'sushi' });
    expect(wrapper.state.menuName).toEqual('sushi');
  });
});
