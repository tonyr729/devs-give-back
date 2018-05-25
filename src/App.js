import React, { Component } from 'react';
import { UserLogin } from './components/UserLogin';
import DevLogin from './components/DevLogin';
import './App.css';

class App extends Component {





  render() {
    return (
      <div className="App">
        <UserLogin />
        <DevLogin />
      </div>
    );
  }
}

export default App;
