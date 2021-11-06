// import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { history } from './store/store';
import { getMockStore } from '../test-utils/mock';
import { mount } from 'enzyme';

const userInitialState = {
  
};
const recordInitialState = {

};
const menuInitialState = {

};
const recipeInitialState = {

};

const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

describe('App' , () => {
  let app;
  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it("should render correctly", () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
