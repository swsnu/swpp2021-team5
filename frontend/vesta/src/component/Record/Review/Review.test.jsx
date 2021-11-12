import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { getMockStore } from '../../../../test-utils/mock';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/Record/record';
import Review from './Review';

const userInitialState = {};
const recordInitialState = {
  userRecords: [
    {
      id: 1,
      image: "/sushi_example_image.jpeg",
      date: "2021/11/09",
      liked: true,
      review: null,
    },
    {
      id: 2,
      image: "/chicken_sample_image.jpeg",
      date: "2021/11/08",
      liked: false,
      review: null,
    },
    {
      id: 3,
      image: "/pasta_sample_image.jpeg",
      date: "2021/11/07",
      liked: true,
      review: null,
    },
  ],
  selectedRecord: {
    id: 1,
    date: "2021/11/09",
    liked: true,
    review: "My favorite Dish",
  },
  selectedReview: null,
};
const stubMenuInitialState = {};
const recipeInitialState = {};
const mockStore = getMockStore(userInitialState, recordInitialState, stubMenuInitialState, recipeInitialState);

describe('<Review/>', () => {
  let review;
  let spyGetRecord;

  beforeEach(() => {
    review = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
              render={() => <Review />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetRecord = jest.spyOn(actionCreators, 'getRecord')
    .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => jest.clearAllMocks());

  it('should render', () => {
    const component = mount(review);
    expect(component.length).toBe(1);
    expect(spyGetRecord).toBeCalledTimes(1);
  });

  it('should edit review button', () => {
    let spyOnEditReview = jest.spyOn(actionCreators, 'editReview')
      .mockImplementation(() => (dispatch) => {});
    const component = mount(review);
    component.find('button#edit-review-button').simulate('click');
    const wrapper = component.find(Review.WrappedComponent).instance();
    expect(wrapper.state.editing).toBe(true);
    component.find('button#confirm-review-button').simulate('click');
    expect(spyOnEditReview).toHaveBeenCalled();
  });

  it('should match state review when editing', () => {
    const component = mount(review);
    component.find('button#edit-review-button').simulate('click');
    component.find('textarea#edit-review-text-area').simulate('change', { target: { value: 'test_review' } });
    const wrapper = component.find(Review.WrappedComponent).instance();
    expect(wrapper.state.review).toEqual('test_review');
  });

  it('should cancel editing review', () => {
    const component = mount(review);
    component.find('button#edit-review-button').simulate('click');
    component.find('button#cancel-review-button').simulate('click');
    const wrapper = component.find(Review.WrappedComponent).instance();
    expect(wrapper.state.editing).toBe(false);
  });

  it('should delete review', () => {
    window.confirm = jest.fn().mockImplementation(() => true);
    let spyOnDeleteReview = jest.spyOn(actionCreators, 'deleteReview')
      .mockImplementation(() => (dispatch) => {});
    const component = mount(review);
    const wrapper = component.find('button#delete-review-button').simulate('click');
    expect(window.confirm).toHaveBeenCalled();
    expect(spyOnDeleteReview).toBeCalled();
  });
});

// const userInitialState = {};
// const recordInitialState_ = {
//   userRecords: null,
//   selectedRecord: null,
//   selectedReview: null,
// };
// const stubMenuInitialState = {};
// const recipeInitialState = {};
// const mockStore_ = getMockStore(userInitialState, recordInitialState_, stubMenuInitialState, recipeInitialState);

// describe('<Review/> with null', () => {
//   let review_;
//   let spyGetRecord;

//   beforeEach(() => {
//     review_ = (
//       <Provider store={mockStore_}>
//         <ConnectedRouter history={history}>
//           <Switch>
//             <Route path='/' exact
//               render={() => <Review />} />
//           </Switch>
//         </ConnectedRouter>
//       </Provider>
//     );
//     spyGetRecord = jest.spyOn(actionCreators, 'getRecord')
//     .mockImplementation(() => (dispatch) => {});
//   });

//   afterEach(() => jest.clearAllMocks());

//   it('should render', () => {
//     const component = mount(review_);
//     expect(component.length).toBe(1);
//     expect(spyGetRecord).toBeCalledTimes(1);
//   });

//   it('should create review', () => {
//     const component = mount(review_);
//     component.find('textarea#create-review-text-area').simulate('change', { target: { value: 'test_create_review' } });
//     const wrapper = component.find(Review.WrappedComponent).instance();
//     expect(wrapper.state.review).toEqual('test_create_review');
//   });
// });