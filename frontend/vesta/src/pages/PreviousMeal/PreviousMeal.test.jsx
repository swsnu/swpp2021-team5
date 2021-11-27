import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';
import PreviousMeal from './PreviousMeal';

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

describe('<PreviousMeal />', () => {
  let recordDetail;
  beforeEach(() => {
    recordDetail = (
      <Route
        path="/"
        exact
        render={({match}) => <PreviousMeal id={match.params.id} />}
      />
    );
  });
<<<<<<< HEAD
<<<<<<< HEAD
  it('should be rendered properly', () => {
    const setRouteLeaveHook = jest.fn();
    const component = shallow(<PreviousMeal.WrappedComponent params={{router: setRouteLeaveHook}} />);
    const wrapper = component.find('.PreviousMeal');
=======
<<<<<<< HEAD:frontend/vesta/src/pages/PreviousMeal/PreviousMeal.test.js
=======
>>>>>>> 237e60ef531261c6ac3f1be226be940896e061c3
  it('should be rendered properly', () => {
    const component = mount(recordDetail);
    const wrapper = component.find('.Records');
>>>>>>> develop
    expect(wrapper.length).toBe(1);
  });
});
