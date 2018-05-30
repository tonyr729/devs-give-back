import React, { Component } from 'react';
import firebase from '../../firebase/firebase';
import './ClientLogin.css';
import { connect } from 'react-redux';
import { signInClient, clientError } from '../../actions/actions';
import DataCleaner from '../../helpers/DataCleaner';

const cleaner = new DataCleaner();

export class ClientLogin extends Component {
  
  googleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      const cleanUser = cleaner.cleanClientLogin(response.user)
      this.handleUser(cleanUser)
      this.props.history.push("/problem-title");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message
      const email = error.email;
      const credential = error.credential;
      const errorInfo = { errorCode, errorMessage, email, credential};
      this.props.clientError(errorInfo);
      this.props.history.push("/error-page")
    }
  };
  
  handleUser = (user) => {
    this.props.signInClient(user);
    firebase.database().ref('users/' + user.id).set({
      username: user.name,
      picture: user.photoURL
    });
  }
  
  render() {
    return (
      <div>
        <p className='login-message'>Please login</p>
        <button className='login-button'onClick={()=> this.googleLogin()}>Login with Google</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.client,
  clientError: state.clientError
})

const mapDispatchToProps = (dispatch) => ({
  signInClient: (user) => dispatch(signInClient(user)),
  clientError: (error) => dispatch(clientError(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
