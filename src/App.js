import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Splash } from './components/Stateless/Splash/Splash';
import { Choice } from './components/Stateless/Choice/Choice';
import { SplitLogin } from './components/Stateless/SplitLogin/SplitLogin';
import ClientLogin from './containers/ClientLogin/ClientLogin';
import DevLogin from './containers/DevLogin/DevLogin';
import ProblemTitle from './containers/ProblemTitle/ProblemTitle';
import ProblemBody from './containers/ProblemBody/ProblemBody';
import { ProblemCreated } from './components/Stateless/ProblemCreated/ProblemCreated';
import PriorProblem from './containers/PriorProblem/PriorProblem';
import ClientProfile from './containers/ClientProfile/ClientProfile';
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
        <Route path='/problem-body' component={ ProblemBody } />
        <Route path='/problem-created' component={ ProblemCreated } />
        <Route path='/prior-problem' component={ PriorProblem } />
        <Route path='/client-profile' component={ ClientProfile } />
      </div>
    );
  }
}

export default App;
