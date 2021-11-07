import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import NutritionalInfoAndRecipe from './pages/Nutritional_Info_and_Recipe/NutritionalInfoAndRecipe';
import GlobalFonts from './styles/fonts/fonts';
import Header from './component/Header/Header';

function App(props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <GlobalFonts />
      <div className="App">
        <Header />
        <Switch>
          <Route
            path="/login"
            exact
            render={() => (
              <div className="ui placeholder segment">
                <p />
                <div className="ui active dimmer">
                  <div className="ui text loader">Loading</div>
                </div>
                <p />
              </div>
            )}
          />
          <Route
            path="/recommendation"
            exact
            render={() => <NutritionalInfoAndRecipe />}
          />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
