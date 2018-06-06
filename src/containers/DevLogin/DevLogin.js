import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signInDev, devError} from '../../actions/actions';
import DataCleaner from '../../helpers/DataCleaner';
import DatabaseHelper from '../../helpers/DatabaseHelper';
import './DevLogin.css';

export class DevLogin extends Component {
  constructor() {
    super();
    this.database = new DatabaseHelper();
    this.cleaner = new DataCleaner();
  }


  handleLogin = async () => {
    try {
      const result = await this.database.gitHubLogin();
      const cleanDev = this.cleaner.cleanDevLogin(result.user, result.token);
      this.props.signInDev(cleanDev);
      this.database.writeDevToDatabase(cleanDev);
    } catch (error) {
      const cleanError = this.cleaner.cleanError(error);
      this.props.devError(cleanError);
      this.props.history.push("/error-page");
    }
  };

  logInCheck = (dev) => {
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

export const mapStateToProps = (state) => ({
  dev: state.dev
});

export const mapDispatchToProps = (dispatch) => ({
  signInDev: (user, token) => dispatch(signInDev(user, token)),
  devError: (error) => dispatch(devError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(DevLogin);

