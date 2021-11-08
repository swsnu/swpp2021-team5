import axios from 'axios';
import store from '../../store';
import * as actionCreators from '../index';

const stubMenu = {
  menuName: 'name',
  calories: 500,
  carbs: 700,
  protein: 89,
  fat: 14,
};

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
});
