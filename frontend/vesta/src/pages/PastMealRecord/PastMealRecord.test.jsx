import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import PastMealRecord from './PastMealRecord';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';
import * as actionCreators from '../../store/actions/Record/record';
import * as actionCreators_ from '../../store/actions/User/user';
import RecordDetail from '../../component/Record/RecordDetail/RecordDetail';
import {
  Image, Segment, Dimmer, Loader
} from 'semantic-ui-react';

const stubInitialState = {
  currentUser: {
    userID: 1,
    username: 1,
    age: 1,
    sex: 1,
    height: 1,
    weight: 1,
    preference: 1,
    targetCalories: 1,
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
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/history"
              exact
              render={() => <PastMealRecord />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyGetRecs = jest.spyOn(actionCreators, 'getRecords');
    const spyGetSet = jest.spyOn(actionCreators_, 'getUserSetting');
  });

  it('should be rendered properly', () => {
    const component = mount(recordDetail);
    const wrapper = component.find('div');
    console.log(component)
    expect(wrapper.length).toBe(0);
  });
});
