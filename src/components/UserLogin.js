import React from 'react';
import firebase from '../firebase';

const UserLogin =() => {

  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    const user = response.user;
    console.log(user);
  }

  return (
    <button onClick={()=> googleLogin()}>Login with Google</button>
  );

}

export default UserLogin;