import axios from 'axios';
import store from '../../store';
import * as actionCreators from '../index';

const stubUser = {
  username: 'test',
  userID: 1,
  age: 1,
  sex: true,
  height: 1,
  weight: 1,
  preference: ['test'],
  targetCalories: 1,
};

const stubUserNutrition = {
  calories: 1,
  carbs: 1,
  protein: 1,
  fat: 1,
};

describe('User actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get userNutrition correctly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(() => new Promise((resolve) => {
      const result = {
        status: 200,
        data: stubUserNutrition,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getUserNutrition())
      .then(() => {
        const newState = store.getState();
        expect(newState.user.userNutrition).toEqual(stubUserNutrition);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should save user setting correctly', (done) => {
    axios.put = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.saveUserSetting(stubUser))
      .then(() => {
        const newState = store.getState();
        expect(newState.user.currentUser).toEqual(stubUser);
        expect(axios.put).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should get user setting correctly', (done) => {
    axios.get = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getUserSetting())
      .then(() => {
        const newState = store.getState();
        expect(newState.user.currentUser).toEqual(stubUser);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should delete user account correctly', (done) => {
    axios.delete = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    axios.get = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.deleteUserAccount())
      .then(() => {
        const newState = store.getState();
        expect(newState.user.currentUser).toEqual(null);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should register new account correctly', (done) => {
    axios.post = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.signUp())
      .then(() => {
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should login correctly', (done) => {
    axios.post = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubUser,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.logIn())
      .then(() => {
        const newState = store.getState();
        expect(newState.user.currentUser).toEqual(stubUser);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
