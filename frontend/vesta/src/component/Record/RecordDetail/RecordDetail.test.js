import React from 'react';
import { shallow, mount } from 'enzyme';
import RecordDetail from './RecordDetail';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mock';
import * as actionCreators from '../../../store/actions/Record/record';
import * as actionCreators_ from '../../../store/actions/Menu/menu';

const stubInitialState = {
  user: null,
}

jest.mock('../Review/Review', () => {
  return jest.fn(props => {
    return (
      <div className="spyReview">
        spyReview
      </div>
    )
  })
})
// jest.mock('semantic-ui-react', () => {
//   const module = { Grid: jest.fn(props => {
//     const Column = jest.fn();
//     return (
//       <div className="spyGrid"></div>
//     )
//   }), Button: jest.fn()};
//   module.Grid = jest.fn();
//   return module;
// });

const mockStore = getMockStore(stubInitialState, stubInitialState, stubInitialState, stubInitialState);



describe('<RecordDetail />', () => {
  let recordDetail;
  beforeEach(() => {
    recordDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
              render={() => <RecordDetail />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  })
  it('should be rendered properly', () => {
    const spyGetRec = jest.spyOn(actionCreators, 'getRecord').mockImplementation(()=>{return;})
    const spyToggleRec = jest.spyOn(actionCreators, 'toggleRecord').mockImplementation(id => { return dispatch => {}; });
    const spyGetmenu = jest.spyOn(actionCreators_, 'getMenu')

    const component = shallow(recordDetail);
    const wrapper = component.find('.RecordDetail');
    expect(wrapper.length).toBe(0);
  })
})