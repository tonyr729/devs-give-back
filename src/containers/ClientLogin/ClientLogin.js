import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import './ClientLogin.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signInClient, clientError } from '../../actions/actions';
import { googleLogin } from '../../helpers/apiCalls';
import DataCleaner from '../../helpers/DataCleaner';

const cleaner = new DataCleaner();

export class ClientLogin extends Component {
  
  handleLogin = async () => {
    try {
      const user = await googleLogin();
      console.log(user)
      const client = cleaner.cleanClientLogin(user)
      this.props.signInClient(client);
      this.writeToDatabase(client);
      console.log('working')
    } catch (error) {
      const cleanError = cleaner.cleanError(error)
      this.props.clientError(cleanError);
      this.props.history.push("/error-page")
      console.log(error)
    }
  };
  
  writeToDatabase = (client) => {
    firebase.database().ref('clients/' + client.id).set({
      username: client.name,
      picture: client.photoURL
    });
  }
  
  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value !== 0 ) {
      return <Redirect to='/problem-title'/>
    }
  }
  
  render() {
    const redirect = this.logInCheck(this.props.client);
    return (
      <div className='client-background'>
        { redirect }
        <p className='login-message'>Please login</p>
        <button className='login-button'onClick={()=> this.handleLogin()}>Login with Google</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
  clientError: state.clientError
})

const mapDispatchToProps = (dispatch) => ({
  signInClient: (client) => dispatch(signInClient(client)),
  clientError: (error) => dispatch(clientError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
