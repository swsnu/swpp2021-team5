import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../../test-utils/mock';
import MenuRecommendation from './MenuRecommendation';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/Menu/menu';

const userInitialState = {

};
const recordInitialState = {

};
const stubMenuInitialState = {
  selectedMenu: {
    name: 'Oatmeal',
    calories: 404,
    carbs: 60,
    protein: 22,
    fat: 16,
    recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
  },
  allMenus: null,
  recommendedMenus: [
    [
      {
        name: 'Oatmeal',
        calories: 404,
        carbs: 60,
        protein: 22,
        fat: 16,
        recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
      }
    ], [
      {
        name: 'Chicken Teriyaki',
        calories: 300,
        carbs: 50,
        protein: 5,
        fat: 2,
        recipe: '1. Preheat an oven to 350 degrees F 175 degrees C.\n2. Stir the soy sauce sugar 1 teaspoon of black pepper cornstarch and 1/2 cup of the reserved pineapple juice together in a saucepan until the sugar is completely dissolved add the onion garlic and ginger. Bring the mixture to a boil and cook until the sauce thickens about 5 minutes.',
      }
    ], [
      {
        name: 'bibimbap',
        calories: 800,
        carbs: 150,
        protein: 45,
        fat: 15,
        recipe: '1. Stir cucumber pieces with 1/4 cup gochujang paste in a bowl set aside.\\n2. Bring about 2 cups of water to a boil in a large nonstick skillet and stir in spinach cook until spinach is bright green and wilted 2 to 3 minutes. Drain spinach and squeeze out as much moisture as possible set spinach aside in a bowl and stir soy sauce into spinach.',
      },
    ],
  ],
};
const recipeInitialState = {

};
const mockStore = getMockStore(userInitialState, recordInitialState, stubMenuInitialState, recipeInitialState);

describe('MenuRecommenation', () => {
  let menuRecommendation;
  let spyGetRecommendedMenus;

  beforeEach(() => {
    menuRecommendation = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <MenuRecommendation />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRecommendedMenus = jest.spyOn(actionCreators, 'getRecommendedMenus')
      .mockImplementation(() => (dispatch) => {});
  });

  it('should render correctly', () => {
    const component = mount(menuRecommendation);
    const wrapper = component.find('MenuRecommendation');
    expect(wrapper.length).toBe(1);
  });
});
