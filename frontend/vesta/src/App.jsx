import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { ConnectedRouter } from 'connected-react-router';

function App() {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <div className="ui main text container">
          <div className="ui placeholder">
            <i className="id card icon" />
            <Button class="ui button">main</Button>
            <Button class="ui button">logout</Button>
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
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
