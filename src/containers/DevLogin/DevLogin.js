import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signInDev, devError } from '../../actions/actions';
import firebase from '../../firebase/firebase';
import DataCleaner from '../../helpers/DataCleaner';
import DatabaseHelper from '../../helpers/DatabaseHelper';
import './DevLogin.css'

const cleaner = new DataCleaner();

export class DevLogin extends Component {
  constructor() {
    super();
    this.database = new DatabaseHelper();
  }


  handleLogin = async () => {
    try {
      const result = await this.database.gitHubLogin();
      const cleanDev = cleaner.cleanDevLogin(result.user, result.token);
      this.props.signInDev(cleanDev);
      this.writeToDatabase(cleanDev)
    } catch (error) {
      const cleanError = cleaner.cleanError(error);
      this.props.devError(cleanError);
      this.props.history.push("/error-page")
    };
  };

  writeToDatabase = (dev) => {
    firebase.database().ref('devs/' + dev.id).set({
      name: dev.name,
      photo: dev.photoURL,
      token: dev.token
    });
  }

  logInCheck = (dev) => {
    console.log(dev)
    const value = Object.keys(dev).length;
    if ( value !== 0 ) {
      return (<Redirect to='/dev-profile'/>);
    }
  }

  render() {
    const redirect = this.logInCheck(this.props.dev);
    return (
      <div>
        { redirect }
        <p className='login-message'>Please login</p>
        <button className='login-button-github'onClick={()=> this.handleLogin()}>Login with GitHub</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dev: state.dev
});

const mapDispatchToProps = (dispatch) => ({
  signInDev: (user, token) => dispatch(signInDev(user, token)),
  devError: (error) => dispatch(devError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(DevLogin);

