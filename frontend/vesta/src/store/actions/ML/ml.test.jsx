import axios from 'axios';
import store from '../../store';
import * as actionCreators from '../index';

const stubSelectedMenu = {
  recognition_results: ['1'],
  nutritional_info: ['1'],
  ingredients: ['1'],
};

describe('record actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get menu', (done) => {
    axios.post = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubSelectedMenu,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.detect(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.ml.detectedMenu).toEqual(stubSelectedMenu.recognition_results);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
