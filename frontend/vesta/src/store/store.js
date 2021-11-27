import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import userReducer from './reducers/user';
import recordReducer from './reducers/record';
import menuReducer from './reducers/menu';
import recipeReducer from './reducers/recipe';
import mlReducer from './reducers/ml';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: userReducer,
  record: recordReducer,
  menu: menuReducer,
  recipe: recipeReducer,
  ml: mlReducer,
  router: connectRouter(history),
});

export const middleWares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWares)));

export default store;
