import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Splash } from './components/Splash';
import { Sort } from './components/Sort';
import { SplitLogin } from './components/SplitLogin';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={Splash} />
        <Route path='/sort' component={Sort} />
        <Route path='/split-login' component={SplitLogin} />
      </div>
    );
  }
}

export default App;
