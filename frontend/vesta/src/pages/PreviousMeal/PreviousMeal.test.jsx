import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import PreviousMeal from './PreviousMeal';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';

const stubInitialState = {
  user: null,
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

jest.mock('../../component/Record/RecordDetail/RecordDetail', () => jest.fn((props) => (
  <div className="spyRecordDetail">
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
              path="/"
              exact
              render={() => <PreviousMeal />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
<<<<<<< HEAD:frontend/vesta/src/pages/PreviousMeal/PreviousMeal.test.js
  it('should be rendered properly', () => {
=======
  xit('should be rendered properly', () => {
>>>>>>> 6182de8d9430e3c854a009749daad57f4d8e55d4:frontend/vesta/src/pages/PreviousMeal/PreviousMeal.test.jsx
    const component = mount(recordDetail);
    const wrapper = component.find('.Records');
    expect(wrapper.length).toBe(1);
  });
});
