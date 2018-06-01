import { shallow, mount } from 'enzyme';
import React from 'react';
import { ClientLogin } from './ClientLogin';
import firebase from '../../firebase/firebase'
import { Redirect } from 'react-router-dom';
jest.mock('../../firebase/firebase');
jest.mock('../../helpers/DataCleaner.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      cleanClientLogin: jest.fn().mockImplementation(() => Promise.resolve({user: 'name'})),
      cleanError: jest.fn().mockImplementation(() => Promise.resolve({error: 'error'}))
    };
  });
});


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
  });
  
  describe('handleLogin', () => {
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
      clientLogin.instance().api.googleLogin = jest.fn().mockImplementation(() => Promise.resolve({user: 'name'}));
    });
      
    
    it('should call the required functions when called', async () => {
      const instance = clientLogin.instance()
      
      await instance.handleLogin()
      
      expect(instance.api.googleLogin).toHaveBeenCalled()
      expect(instance.cleaner.cleanClientLogin).toHaveBeenCalled();
      expect(instance.props.signInClient).toHaveBeenCalled();
    });
  });


  describe('writeToDatabase', () => {
    let mockProps;
    let clientLogin;

    beforeEach(() => {
      mockProps = {
        client: { },
        clientError: jest.fn(),
        signInClient: jest.fn(),
        history: { push: jest.fn() }
      };
      
      clientLogin = shallow(<ClientLogin {...mockProps} />);
    });

    it('should send client to database', () => {
      clientLogin.instance().writeToDatabase(mockProps.client)


      expect(firebase.database().ref().set).toHaveBeenCalled();
    });
  });
});
