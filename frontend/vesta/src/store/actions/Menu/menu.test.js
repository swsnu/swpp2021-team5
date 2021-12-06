import axios from 'axios';
import store from '../../store';
import * as actionCreators from '../index';

const stubMenu = {
  name: 'Oatmeal',
  calories: 404,
  carbs: 60,
  protein: 22,
  fat: 16,
  recipe: '1. Preheat oven to 375F.\n2. In a large bowl cream together butter brown sugar vanilla and cinnamon until smooth.\n3. Add the two kinds of oats one at a time mixing well after each addition.',
};

const stubRecommendedMenus = [
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
];

describe('menu actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get menu correctly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubMenu,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getMenu())
      .then(() => {
        const newState = store.getState();
        expect(newState.menu.selectedMenu).toBe(stubMenu);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should get recommended menus', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubMenu,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getRecommendedMenus())
      .then(() => {
        const newState = store.getState();
        expect(newState.menu.recommendedMenus).toBe(stubMenu);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should get count all', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: 0,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getCountAll())
      .then(() => {
        const newState = store.getState();
        // expect(newState.menu.count).toBe(0);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should chanage recommendation', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubMenu,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.changeRecommendation())
      .then(() => {
        const newState = store.getState();
        expect(newState.menu.recommendedMenus).toBe(stubMenu);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

});
