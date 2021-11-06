import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ConnectedRouter } from 'connected-react-router';
import NutritionalInfoAndRecipe from './pages/Nutritional_Info_and_Recipe/NutritionalInfoAndRecipe';

function App(props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <div className="ui main text container">
          <div className="ui placeholder">
            <i className="id card icon" />
            <Button className="ui button">main</Button>
            <Button className="ui button">logout</Button>
          </div>
        </div>
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
