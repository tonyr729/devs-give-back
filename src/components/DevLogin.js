import React, { Component } from 'react';
import firebase from '../firebase';

const DevLogin = () => {

  const gitHubLogin = async () => {
    try {
      const provider = new firebase.auth.GithubAuthProvider().addScope('user')
      const response = await firebase.auth().signInWithPopup(provider);
      const user = response.user;
      const repo = response.repo;
      console.log(response)
    } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      const errorInfo = { errorCode, errorMessage, email, credential};
      console.log(errorInfo)
    };
  };

  return (
    <div>
      <button onClick={()=> gitHubLogin()}>Login with GitHub</button>
    </div>
  );
}


export default DevLogin;