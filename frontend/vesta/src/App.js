import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import  { Button } from 'semantic-ui-react';
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <div class="ui main text container">
          <div class="ui placeholder">
            <i class="id card icon"></i>
            <Button class="ui button">main</Button>
            <Button class="ui button">logout</Button>
            </div>
        </div>
        <Switch>
          <Route path='/login' exact render={() => (<div class="ui placeholder segment">
            <p></p>
            <div class="ui active dimmer">
              <div class="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>)} />
          <Redirect exact from='/' to='/login' />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
