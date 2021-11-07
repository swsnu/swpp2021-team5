import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { getMockStore } from '../../../test-utils/mock';
import NutritionalInfoAndRecipe from './NutritionalInfoAndRecipe';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

const userInitialState = {
  
};
const recordInitialState = {

};
const menuInitialState = {

};
const recipeInitialState = {

};
const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('<NutritionalInfoAndRecipe />', () => {
  let nutritional;
  beforeEach(() => {
    nutritional = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={NutritionalInfoAndRecipe} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors', () => {
    const component = mount(nutritional);
    const wrapper = component.find('.NutritionalInfoAndRecipe');
    expect(wrapper.length).toBe(1);
  });

});

