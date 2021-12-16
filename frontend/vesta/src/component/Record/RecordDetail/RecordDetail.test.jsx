import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import {
  Button, Grid, Image, Segment, Dimmer, Loader
} from 'semantic-ui-react';
import RecordDetail from './RecordDetail';
import Review from '../Review/Review';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mock';
import * as actionCreators from '../../../store/actions/Record/record';
import * as actionCreators_ from '../../../store/actions/Menu/menu';
import mockRecordDetailStore from '../../../test-utils/mock';

const stubInitialState = {
  selectedRecord: {
    id: 1,
    liked: true,
    date: 1,
    menu_name: 1,
    menu_calories: 1,
    menu_carbs: 1,
    menu_protein: 1,
    menu_fat: 1,
    review: "1",
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
              render={() => <RecordDetail id={1} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const spyGetRec = jest.spyOn(actionCreators, 'getRecord');
    const spyToggleRec = jest.spyOn(actionCreators, 'toggleRecord');
    const spyGetmenu = jest.spyOn(actionCreators_, 'getMenu');
    const spyGetRecs = jest.spyOn(actionCreators, 'getRecords');
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  xit('should be rendered properly', () => {

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
  // it('should toggle liked', () => {
  //   const stubInitialState2 = {
  //     selectedRecord: {
  //       id: 1,
  //       liked: false,
  //       date: 1,
  //     },
  //     selectedMenu: null
  //   };

  //   const component2 = mount(
  //     <Provider store={getMockStore(stubInitialState2, stubInitialState2, stubInitialState2, stubInitialState2)}>
  //       <ConnectedRouter history={history}>
  //         <Switch>
  //           <Route
  //             path="/"
  //             render={() => <RecordDetail />}
  //           />
  //         </Switch>
  //       </ConnectedRouter>
  //     </Provider>
  //   );
  //   console.log(component2)
  //   const wrapper2 = component2.find('div');
  //   expect(wrapper2.length).toBe(1);
  //   expect(wrapper2).toHaveStyle(`color: "red"`)
  // });
});
