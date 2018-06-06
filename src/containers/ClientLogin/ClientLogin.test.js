import { shallow} from 'enzyme';
import React from 'react';
import { 
  ClientLogin, 
  mapStateToProps, 
  mapDispatchToProps 
} from './ClientLogin';

import firebase from '../../firebase/firebase';
import { Redirect } from 'react-router-dom';
jest.mock('../../firebase/firebase');
jest.mock('../../helpers/DataCleaner.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      cleanClientLogin: jest.fn().mockImplementation(() => 
        Promise.resolve({user: 'name'})),
      cleanError: jest.fn().mockImplementation(() => 
        Promise.resolve({error: 'error'}))
    };
  });
});


describe('ClientLogin', () => {
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

      expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
      expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled();
    });
  });

  describe('logInCheck', () => {
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
    
    it('should call redirect if client is not signed in', () => {
      
      const expected = clientLogin.instance().logInCheck({client: 'tony'});
      
      expect(expected).toEqual(<Redirect push={false} to='/problem-title'/>);
    });
  });
  
  describe('handleLogin', () => {
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
      clientLogin.instance()
        .database.googleLogin = jest.fn().mockImplementation(() => 
          Promise.resolve({user: 'name'}));
    });
      
    
    it('should call the required functions when called', async () => {
      const instance = clientLogin.instance();
      
      await instance.handleLogin();
      
      expect(instance.database.googleLogin).toHaveBeenCalled();
      expect(instance.cleaner.cleanClientLogin).toHaveBeenCalled();
      expect(instance.props.signInClient).toHaveBeenCalled();
    });

    it('should call the required functions when error', async () => {
      clientLogin.instance()
        .database.googleLogin = jest.fn().mockImplementation(() => 
          Promise.reject({Error: 'error'}));
      const instance = clientLogin.instance();
      
      await instance.handleLogin();
      
      expect(instance.cleaner.cleanError).toHaveBeenCalled();
      expect(instance.props.history.push).toHaveBeenCalled();
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
      clientLogin.instance().database.writeClientToDatabase(mockProps.client);


      expect(firebase.database().ref().set).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: {name: 'Tony'},
        clientError: {error: "error"}
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch on signInClientwith the correct params', () => {

      const mockDispatch = jest.fn();
      const user = {name: 'Tony'};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SIGN_IN_CLIENT',
        user
      };
      
      mappedProps.signInClient(user);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch on clientError with the correct params', () => {

      const mockDispatch = jest.fn();
      const error = {error: 'error'};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'CLIENT_ERROR',
        error
      };
      
      mappedProps.clientError(error);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });
  });
});
