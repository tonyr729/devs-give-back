import { shallow, mount } from 'enzyme';
import React from 'react';
import { 
  DevLogin, 
  mapStateToProps, 
  mapDispatchToProps 
} from './DevLogin';

import firebase from '../../firebase/firebase';
import { Redirect } from 'react-router-dom';
jest.mock('../../firebase/firebase');
jest.mock('../../helpers/DataCleaner.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      cleanDevLogin: jest.fn().mockImplementation(() => Promise.resolve({user: 'name'})),
      cleanError: jest.fn().mockImplementation(() => Promise.resolve({error: 'error'}))
    };
  });
});


describe('DevLogin', () => {
  it('should match snapshot', () => {
    const devLogin = shallow(<DevLogin dev={{}} />)

    expect(devLogin).toMatchSnapshot();
  });
  
  describe('gitHubLogin', () => {
    let mockProps;
    let devLogin;
    
    beforeEach(() => {
      mockProps = {
        dev: { },
        devError: jest.fn(),
        signInDev: jest.fn(),
        history: { push: jest.fn() }
      };
      
      devLogin = shallow(<DevLogin {...mockProps} />);
      devLogin.instance().database.gitHubLogin = jest.fn().mockImplementation(() => Promise.resolve({user: 'name'}));
    });
  
    it('should call the expected methods of firebase', () => {
      devLogin.instance().handleLogin()

      expect(devLogin.instance().database.gitHubLogin).toHaveBeenCalled();
    });
  });

  describe('logInCheck', () => {
    let mockProps;
    let devLogin;
    
    beforeEach(() => {
      mockProps = {
        dev: {user: 'tony'},
        devError: jest.fn(),
        signInDev: jest.fn(),
        history: { push: jest.fn() }
      };
      
      devLogin = shallow(<DevLogin {...mockProps} />);
      devLogin.instance().database.gitHubLogin = jest.fn().mockImplementation(() => Promise.resolve({user: 'name'}));
    });

    it('should call redirect if dev issigned in', () => {
      const expected = devLogin.instance().logInCheck(mockProps.dev)

      expect(expected).toEqual(<Redirect to='/dev-profile'/>);
    });
  });

  describe('handleLogin', () => {
    let mockProps;
    let devLogin;
    
    beforeEach(() => {
      mockProps = {
        dev: { },
        devError: jest.fn(),
        signInDev: jest.fn(),
        history: { push: jest.fn() }
      };
      
      devLogin = shallow(<DevLogin {...mockProps} />);
      devLogin.instance().database.gitHubLogin = jest.fn().mockImplementation(() => Promise.resolve({user: 'name'}));
    });
      
    
    it('should call the required functions when called', async () => {
      const instance = devLogin.instance()
      
      await instance.handleLogin()
      
      expect(instance.database.gitHubLogin).toHaveBeenCalled()
    });

    it('should call the required functions when there is an error', async () => {
      devLogin.instance().database.gitHubLogin = jest.fn().mockImplementation(() => Promise.reject({Error: 'error'}));
      const instance = devLogin.instance()
      
      await instance.handleLogin()
      
      expect(instance.cleaner.cleanError).toHaveBeenCalled();
      expect(instance.props.history.push).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with Dev info', () => {

      const mockState = {
        dev: {name: 'Tony'},
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch on signInDevwith the correct params', () => {

      const mockDispatch = jest.fn();
      const user = {name: 'Tony'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SIGN_IN_DEV',
        user
      };
      
      mappedProps.signInDev(user);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch on DevError with the correct params', () => {

      const mockDispatch = jest.fn();
      const error = {error: 'error'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'DEV_ERROR',
        error
      };
      
      mappedProps.devError(error);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });
  });
});
