import { shallow, mount } from 'enzyme';
import React from 'react';
import { ClientLogin } from './ClientLogin';
import firebase from '../../firebase/firebase'
import { Redirect } from 'react-router-dom';
jest.mock('../../firebase/firebase');


describe('ClientLogin', () => {
  let mockProps;
  let clientLogin

  beforeEach(() => {
    mockProps = {
      client: { },
      clientError: jest.fn(),
      signInClient: jest.fn(),
      history: { push: jest.fn() }
    };
    
    clientLogin = shallow(<ClientLogin {...mockProps} />);
  });

  it('should match snapshot', () => {
    expect(clientLogin).toMatchSnapshot();
  });

  describe('googleLogin', () => {
    let clientLogin;
    let mockProps;

    beforeEach(() => {
      mockProps = {
        client: { },
        clientError: jest.fn(),
        signInClient: jest.fn(),
        history: { push: jest.fn() }
      };

      clientLogin = shallow(<ClientLogin {...mockProps} />);
    });

    it('should call the expected methods of firebase', () => {
      clientLogin.find('button').simulate('click');

      expect(firebase.auth().signInWithPopup).toHaveBeenCalled()
      expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled()
    });
  });

  describe('logInCheck', () => {
    let mockProps;
    let clientLogin

    beforeEach(() => {
      mockProps = {
        client: { },
        clientError: jest.fn(),
        signInClient: jest.fn(),
        history: { push: jest.fn() }
      };
      
      clientLogin = shallow(<ClientLogin {...mockProps} />);
    });

    it('should call redirect if client is not signed in', () => {

      const expected = clientLogin.instance().logInCheck({client: 'tony'})

      expect(expected).toEqual(<Redirect push={false} to='/problem-title'/>);
    });

    it('should call signInClient action on click', async () => {
      const user = {
        uid: 1,
        displayName: 'tony',
        photoURL: 'pizza.jpg',
        apiKey: 132451
      }
    
      clientLogin.instance().googleLogin = jest.fn().mockReturnValue(user)

      console.log(clientLogin.instance().handleLogin())

      expect(mockProps.signInClient).toHaveBeenCalled();
    });
  });
  
});
