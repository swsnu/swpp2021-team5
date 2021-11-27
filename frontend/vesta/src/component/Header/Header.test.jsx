import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import Header from './Header';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mock';
import * as actionCreators from '../../store/actions/User/user';

const userInitialState = {};
const recordInitialState = {
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
    {
      id: 3,
      image: '/pasta_sample_image.jpeg',
      date: '2021/11/07',
      liked: true,
      review: null,
    },
  ],
  selectedRecord: {
    id: 1,
    date: '2021/11/09',
    liked: true,
    review: 'My favorite Dish',
  },
  selectedReview: null,
};
const stubMenuInitialState = {};
const recipeInitialState = {};
const mockStore = getMockStore(userInitialState, recordInitialState, stubMenuInitialState, recipeInitialState);

describe('<Header />', () => {
  let header;
  beforeEach(() => {
    header = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => jest.clearAllMocks());

  it('should be rendered properly', () => {
    const component = mount(header);
    const wrapper = component.find('.logo-image');
    expect(wrapper.length).toBe(1);
  });

  it('should logout properly', () => {
    const spyLogout = jest.spyOn(actionCreators, 'logout')
      .mockImplementation(() => (dispatch) => {});
    const component = mount(header);
    component.find('.logout').simulate('click');
    expect(spyLogout).toHaveBeenCalled();
  });
});
