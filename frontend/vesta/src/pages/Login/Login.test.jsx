import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';
import Login from './Login';
import * as actionCreators from '../../store/actions/User/user';

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

describe('<Login />', () => {
  let recordDetail; let
    spyGet;
  beforeEach(() => {
    recordDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Login />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGet = jest.spyOn(actionCreators, 'logIn')
      .mockImplementation((id) => (dispatch) => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be rendered properly', () => {
    const component = mount(recordDetail);
    const wrapper = component.find('.Login');
    expect(wrapper.length).toBe(2);
    const inputs = component.find('input');
    expect(inputs.length).toBe(2);

    inputs.at(0).simulate('change', { target: { value: '1' } });
    inputs.at(1).simulate('change', { target: { value: '1' } });

    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');

    expect(spyGet).toBeCalledTimes(1);
  });
});
