import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Splash } from './components/Stateless/Splash/Splash';
import { Choice } from './components/Stateless/Choice/Choice';
import { SplitLogin } from './components/Stateless/SplitLogin/SplitLogin';
import ClientLogin from './containers/ClientLogin/ClientLogin';
import { DevLogin } from './components/Stateless/DevLogin/DevLogin';
import ProblemTitle from './components/Stateful/ProblemTitle/ProblemTitle';
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
        <Route path='/problem-title' component={ ProblemTitle } />
      </div>
    );
  }
}

export default App;
