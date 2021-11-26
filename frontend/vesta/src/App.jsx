/* eslint-disable */

import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import MenuRecommendation from './pages/Menu_Recommendation/MenuRecommendation';
import NutritionalInfoAndRecipe from './pages/Nutritional_Info_and_Recipe/NutritionalInfoAndRecipe';
import Header from './component/Header/Header';
import PastMealRecord from './pages/PastMealRecord/PastMealRecord';
import Login from './pages/Login/Login';
import PreviousMeal from './pages/PreviousMeal/PreviousMeal';
import FoodRecord from './pages/Food_Record/FoodRecord';
import ConfirmDetection from './pages/Confirm_Detection/ConfirmDetection';
import Main from './pages/Main/Main';

import Setting from './pages/Setting/Setting';
import Statistics from './pages/Statistics/Statistics';

function App(props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Header />
        <Switch>
          <Route
            path="/login"
            exact
            render={() => <Login />}
          />
          <Route
            path="/recommendation"
            exact
            render={() => <MenuRecommendation />}
          />
          <Route
            path="/recommendation/:menuName/:idx"
            exact
            render={() => <NutritionalInfoAndRecipe />}
          />
          <Route
            path="/history"
            exact
            render={() => <PastMealRecord />}
          />
          <Route
            path="/history/:id"
            exact
            render={() => <PreviousMeal />}
          />
          <Route
            path="/record"
            exact
            render={() => <FoodRecord />}
          />
          <Route
            path="/confirm"
            exact
            render={() => <ConfirmDetection />}
          />
          <Route
            path="/main"
            exact
            render={() => <Main />}
          />
          <Redirect exact from="/" to="/main" />
          <Route
            path="/setting"
            exact
            render={() => <Setting />}
          />
          <Route
            path="/statistics"
            exact
            render={() => <Statistics />}
          />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
