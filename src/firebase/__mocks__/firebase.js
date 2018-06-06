import * as firebase from 'firebase';

const onAuthStateChanged = jest.fn();

const sendEmailVerification = jest.fn(() => {
  return Promise.resolve('result of sendEmailVerification');
});

const createUserWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of createUserWithEmailAndPassword');
});

const signInWithEmailAndPassword = jest.fn(() => {
  return Promise.resolve('result of signInWithEmailAndPassword');
});

const signInWithPopup = jest.fn(() => {
  return Promise.resolve({
    user: 'tony',
    credential: {
      accessToken: 123
    }
  });
});

const set = jest.fn();

const push = jest.fn();

let once = jest.fn(() => {
  return Promise.resolve({
    val: jest.fn(()=> {
      return ({
        problem: {
          clientID: 12
        },
        projects: {
          1: {
            projectID: 12
          }
        }
      });
    })
  });
});

const initializeApp = jest
  .spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          currentUser: {
            sendEmailVerification
          }
        };
      }
    };
  });

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    onAuthStateChanged,
    currentUser: {
      displayName: 'testDisplayName',
      email: 'test@test.com',
      emailVerified: true
    },
    signInWithPopup
  };
});

jest.spyOn(firebase, 'database').mockImplementation(() => {
  return {
    ref: () => {
      return {
        set,
        once,
        push
      };
    }
  };
});

firebase.auth.GithubAuthProvider = jest.fn(() => {
  return {
    addScope: jest.fn(() => {})
  };
});
firebase.auth.GoogleAuthProvider = jest.fn(() => {
  return {
    addScope: jest.fn(() => {})
  };
});

export default firebase;