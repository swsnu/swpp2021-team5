// import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App';
import { history } from './store/store';
import { getMockStore } from './test-utils/mock';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router';
import { Route, Link } from 'react-router-dom';
import Signup from './pages/Signup/Signup';

const userInitialState = {};
const recordInitialState = {};
const menuInitialState = {};
const recipeInitialState = {};

const mockStore = getMockStore(userInitialState, recordInitialState, menuInitialState, recipeInitialState);

jest.mock('./pages/Signup/Signup', () => jest.fn(() => <div class="a">signup</div>));
jest.mock('./pages/Menu_Recommendation/MenuRecommendation', () => jest.fn(() => <div class="b"/>));
jest.mock('./pages/Nutritional_Info_and_Recipe/NutritionalInfoAndRecipe', () => jest.fn(() => <div />));
jest.mock('./pages/PastMealRecord/PastMealRecord', () => jest.fn(() => <div />));
jest.mock('./pages/PreviousMeal/PreviousMeal', () => jest.fn(() => <div />));
jest.mock('./pages/Food_Record/FoodRecord', () => jest.fn(() => <div />));
jest.mock('./pages/Confirm_Detection/ConfirmDetection', () => jest.fn(() => <div />));
jest.mock('./pages/Main/Main', () => jest.fn(() => <div />));
jest.mock('./pages/Setting/Setting', () => jest.fn(() => <div />));
jest.mock('./pages/Statistics/Statistics', () => jest.fn(() => <div />));

describe('App', () => {
  let app;
  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render correctly', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
    console.log(component.find('div').length)
    console.log(component.find('Route[exact=true][path="/signup"]').first())
    expect(component.find('Route[exact=true][path="/signup"]').length).toBe(0);
  });

});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
