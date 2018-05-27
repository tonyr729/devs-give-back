import React from 'react';
import firebase from '../../firebase/firebase';
import './ClientLogin.css';

export const ClientLogin =() => {

  const googleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const response = await firebase.auth().signInWithPopup(provider);
      const user = response.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message
      const email = error.email;
      const credential = error.credential;
      const errorInfo = { errorCode, errorMessage, email, credential};
    }

  };
  
  return (
    <div>
      <p className='login-message'>Please login</p>
      <button className='login-button'onClick={()=> googleLogin()}>Login with Google</button>
    </div>
  );
};
