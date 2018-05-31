import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInDev, devError } from '../../actions/actions';
import firebase from '../../firebase/firebase';
import DataCleaner from '../../helpers/DataCleaner';
import { gitHubLogin } from '../../helpers/apiCalls';
import './DevLogin.css'

const cleaner = new DataCleaner();

class DevLogin extends Component {


  login = async () => {
    try {
      const result = await gitHubLogin();
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
    const value = Object.keys(dev).length;
    console.log(value);
    if ( value !== 0 ) {
      this.props.history.push('/dev-profile')
    }
  }

  render() {
    this.logInCheck(this.props.dev)
    return (
      <div>
        <p className='login-message'>Please login</p>
        <button className='login-button-github'onClick={()=> this.login()}>Login with GitHub</button>
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

