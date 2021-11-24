/* eslint-disable */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import RecordDetail from './RecordDetail';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mock';
import * as actionCreators from '../../../store/actions/Record/record';
import * as actionCreators_ from '../../../store/actions/Menu/menu';

const stubInitialState = {
  selectedRecord: {
    id: 1,
    liked: true,
    date: 1,
  },
  selectedMenu: {
    name: 1,
    calories: 1,
    carbs: 1,
    protein: 1,
    fat: 1,
    recipe: 1,
  }
};

jest.mock('../Review/Review', () => jest.fn((props) => (
  <div className="spyReview">
    spyReview
  </div>
)));

const mockStore = getMockStore(stubInitialState, stubInitialState, stubInitialState, stubInitialState);

describe('<RecordDetail />', () => {
  let recordDetail;
  beforeEach(() => {
    recordDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <RecordDetail />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  it('should be rendered properly', () => {
    const spyGetRec = jest.spyOn(actionCreators, 'getRecord').mockImplementation((id) => ({ type: null }));
    const spyToggleRec = jest.spyOn(actionCreators, 'toggleRecord').mockImplementation((id) => (dispatch) => {});
    const spyGetmenu = jest.spyOn(actionCreators_, 'getMenu');

    const component = mount(recordDetail);
    const wrapper = component.find('.RecordDetail');
    expect(wrapper.length).toBe(1);

    const header = component.find('.menuName');
    expect(header.length).toBe(2);
    expect(header.at(1).text()).toEqual('1');

    const buttons = component.find('button');
    expect(buttons.length).toBe(2);
    buttons.at(0).simulate('click');

    buttons.at(1).simulate('click');
    const liked = buttons.find('h4');
    expect(liked.text()).toEqual('♥');
  });
});
