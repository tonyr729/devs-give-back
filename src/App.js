import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Splash } from './components/Splash/Splash';
import { Choice } from './components/Choice/Choice';
import { SplitLogin } from './components/SplitLogin/SplitLogin';
import { ClientLogin } from './components/ClientLogin/ClientLogin';
import { DevLogin } from './components/DevLogin/DevLogin';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={Splash} />
        <Route path='/choice' component={Choice} />
        <Route path='/split-login' component={SplitLogin} />
        <Route path='/dev-login' component={ DevLogin } />
        <Route path='/client-login' component={ ClientLogin } />
      </div>
    );
  }
}

export default App;
