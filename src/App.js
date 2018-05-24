import React, { Component } from 'react';
import firebase from './firebase';
import UserLogin from './components/UserLogin'
import './App.css';

class App extends Component {


componentDidMount() {
  const app = firebase.app();
  console.log(app)
}



  render() {
    return (
      <div className="App">
      <UserLogin />
      </div>
    );
  }
}

export default App;
