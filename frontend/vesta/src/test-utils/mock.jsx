import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middleWares } from '../store/store';

const getMockReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (userInitialState, recordInitialState, menuInitialState, recipeInitialState) => {
  const mockUserReducer = getMockReducer(userInitialState);
  const mockRecordReducer = getMockReducer(recordInitialState);
  const mockMenuReducer = getMockReducer(menuInitialState);
  const mockRecipeReducer = getMockReducer(recipeInitialState);
  const rootReducer = combineReducers({
    user: mockUserReducer,
    record: mockRecordReducer,
    menu: mockMenuReducer,
    recipe: mockRecipeReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middleWares)));
  return mockStore;
};
