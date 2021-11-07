import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history, middleWares } from '../src/store/store';

const getMockReducer = jest.fn(
    initialState => (state = initialState, action) => {
      return state;
    }
)
  
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
    return createStore(rootReducer, applyMiddleware(...middleWares));
}