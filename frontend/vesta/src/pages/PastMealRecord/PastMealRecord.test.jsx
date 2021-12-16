import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import PastMealRecord from './PastMealRecord';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';
import RecordDetail from '../../component/Record/RecordDetail/RecordDetail';

const stubInitialState = {
  user: {
    userID: 1
  },
  userRecords: [
    {
      id: 1,
      image: '/sushi_example_image.jpeg',
      date: '2021/11/09',
      liked: true,
      review: null,
    },
    {
      id: 2,
      image: '/chicken_sample_image.jpeg',
      date: '2021/11/08',
      liked: false,
      review: null,
    },
  ],
};

jest.mock('../../component/Record/Records/Records', () => jest.fn((props) => (
  <div className="spyRecords">
    spyReview
  </div>
)));

const mockStore = getMockStore(stubInitialState, stubInitialState, stubInitialState, stubInitialState);

describe('<PastMealRecord />', () => {
  let recordDetail;
  beforeEach(() => {
    recordDetail = (
      <Provider>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <PastMealRecord />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  xit('should be rendered properly', () => {
    const component = mount(recordDetail);
    const wrapper = component.find('.PastMealRecord');
    expect(wrapper.length).toBe(1);
  });
});
