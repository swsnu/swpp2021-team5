import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mock';
import { history } from '../../store/store';
import FoodRecord from './FoodRecord';

const userInitialState = {};
const recordInitialState = {};
const menuInitialState = {};
const recipeInitialState = {};

let foodRecord;
let file;
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('<FoodRecord />', () => {
  beforeEach(() => {
    file = new File([''], 'foodimage.jpeg', { type: 'image/jpeg' });
    foodRecord = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={FoodRecord} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  xit('should render without errors', () => {
    const component = mount(foodRecord);
    const wrapper = component.find('FoodRecord');
    expect(wrapper.length).toBe(1);
  });

  xit('should handle image upload', () => {
    const component = mount(foodRecord);
    component.find('input#meal-photo').simulate('change', { target: { files: [file] } });
    const wrapper = component.find(FoodRecord.WrappedComponent).instance();
    expect(wrapper.state.image).toBe(null);
  });

  xit('should redirect to confirm detection', () => {
    const component = mount(foodRecord);
    component.find('button#upload-photo-button').simulate('click');
    expect(history.location.pathname).toBe('/confirm');
  });
});
