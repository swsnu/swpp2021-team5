import axios from 'axios';
import store from '../../store';
import * as actionCreators from '../index';

const stubRecord = {
  id: 1,
  date: '2021/11/09',
  liked: true,
  review: 'My favorite Dish',
};

const stubRecords = [
  {
    id: 1,
    image: '/sushi_example_image.jpeg',
    date: '2021/11/09',
    liked: true,
    review: null,
  },
  {
    id: 2,
    image: '/sushi_example_image.jpeg',
    date: '2021/11/09',
    liked: false,
    review: null,
  },
];

const stubSelectedRecord = {
  id: 1,
  date: '2021/11/09',
  liked: true,
  review: 'My favorite Dish',
};

describe('record actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get records', (done) => {
    axios.get = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubRecords,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getRecords(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.userRecords).toEqual(stubRecords);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should get record correctly', (done) => {
    axios.get = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubSelectedRecord,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getRecord(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.selectedRecord).toEqual(stubSelectedRecord);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should toggle record correctly', (done) => {
    axios.put = jest.fn((url) => new Promise((resolve, reject) => {
      const result = { status: 200 };
      resolve(result);
    }));
    store.dispatch(actionCreators.toggleRecord(1))
      .then(() => {
        const newState = store.getState();
        expect(axios.put).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should get review correctly', (done) => {
    axios.get = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: stubRecord,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.getReview(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.selectedRecord).toEqual(stubRecord);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should create review correctly', (done) => {
    axios.post = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: 'My favorite Dish',
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.createReview(1, 'My favorite Dish'))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.selectedReview).toEqual('My favorite Dish');
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should edit review correctly', (done) => {
    axios.put = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: 'My favorite Dish',
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.editReview(1, 'My favorite Dish'))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.selectedReview).toEqual('My favorite Dish');
        expect(axios.put).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should delete review correctly', (done) => {
    axios.delete = jest.fn((url) => new Promise((resolve, reject) => {
      const result = {
        status: 200, data: null,
      };
      resolve(result);
    }));
    store.dispatch(actionCreators.deleteReview(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.record.selectedReview).toEqual(null);
        expect(axios.delete).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
