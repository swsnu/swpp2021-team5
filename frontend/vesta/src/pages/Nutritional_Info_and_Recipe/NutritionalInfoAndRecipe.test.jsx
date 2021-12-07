import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mock';
import NutritionalInfoAndRecipe from './NutritionalInfoAndRecipe';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/Menu/menu';

const userInitialState = {};
const recordInitialState = {};
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
    { name: "1927 peanut butter bread", calories: 173.9, carbs: 8.0, protein: 12.0, fat: 8.0, image: "http://localhost:8000/media/1927-peanut-butter-bread-450534.jpg", recipe: "['1. preheat oven to 350 degrees fahrenheit', '2. sift first 4 ingredients together in bowl', '3. add pb , mix well', '4. add milk , beat well', '5. pour batter into a loaf tin', '6. bake 1 hour or until a toothpick comes out clean']", ingredient: "['flour', 'baking powder', 'salt', 'sugar', 'peanut butter', 'skim milk']"}, 
  ],
  count: -1,
  countAll: 0,
  isUpdated: true,
};
const recipeInitialState = {};
const mockStore = getMockStore(userInitialState, recordInitialState, stubMenuInitialState, recipeInitialState);

describe('<NutritionalInfoAndRecipe />', () => {
  let nutritional; 
  let spyGetRecommendedMenus;
  let match = {
    params: {
      idx: 0
    }
  }
  beforeEach(() => {
    nutritional = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={({match}) => <NutritionalInfoAndRecipe idx={match.params.idx} /> } />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRecommendedMenus = jest.spyOn(actionCreators, 'getRecommendedMenus')
    .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should render without errors', () => {
    const component = mount(nutritional);
    const wrapper = component.find('.NutritionalInfoAndRecipe');
    // expect(wrapper.containsMatchingElement(this.props.match.params.idx)).toBeTruthy();
    expect(spyGetRecommendedMenus).toBeCalled();
  });
});

const stubMenuInitialState_ = {
  selectedMenu: null,
  allMenus: null,
  recommendedMenus: null,
};

const mockStore_ = getMockStore(userInitialState, recordInitialState, stubMenuInitialState_, recipeInitialState);

describe('<NutritionalInfoAndRecipe />', () => {
  let nutritional;
  let spyGetRecommendedMenus;
  beforeEach(() => {
    nutritional = (
      <Provider store={mockStore_}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={NutritionalInfoAndRecipe} match={{ params: { when: 0, idx: 0 } }} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRecommendedMenus = jest.spyOn(actionCreators, 'getRecommendedMenus')
    .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const component = mount(nutritional);
    const wrapper = component.find('.NutritionalInfoAndRecipe');
    expect(spyGetRecommendedMenus).toBeCalled();
  });
});
