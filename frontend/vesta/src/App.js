import logo from './logo.svg';
import './App.css';
import React from 'react';
import  { Button } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
        <p/>
        <Button
            color='red'
            content='Like'
            icon='heart'
            label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
          />
      </header>
    </div>
  );
}

export default App;
