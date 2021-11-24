/* eslint-disable */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Records, { Grid, Image } from './Records';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mock';
import * as actionCreators from '../../../store/actions/Record/record';

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

jest.mock('../Review/Review', () => jest.fn((props) => (
  <div className="spyReview">
    spyReview
  </div>
)));

// const spyGrid = jest.spyOn(Grid, 'Column').mockImplementation(()=>{return (<div></div>)})
// jest.mock('semantic-ui-react', () => {
//   const module = {
//     Grid: jest.fn(props => {
//       const Column = jest.fn();
//         return (
//           <div className="spyGrid"></div>
//         )
//       }),
//     Button: jest.fn(),
//     Menu: jest.fn(),
//     Segment: jest.fn(),
//     "Grid.Column": jest.fn(),
//   };
//   module.Grid = jest.fn();
//   return module;
// });

const mockStore = getMockStore(stubInitialState, stubInitialState, stubInitialState, stubInitialState);

describe('<Records />', () => {
  let recordDetail;
  beforeEach(() => {
    recordDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Records />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  it('should be rendered properly', () => {
    const spyToggle = jest.spyOn(actionCreators, 'toggleRecord').mockImplementation(
      (id) => { }
    );
    const component = mount(recordDetail);
    const wrapper = component.find('.Records');
    expect(wrapper.length).toBe(1);
    const records = component.find('a');
    records.at(0).simulate('click');
    records.at(1).simulate('click');
    records.at(2).simulate('click');
  });
});
