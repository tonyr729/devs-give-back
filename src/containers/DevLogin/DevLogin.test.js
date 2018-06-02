import { shallow } from 'enzyme';
import React from 'react';
import { DevLogin } from './DevLogin';
import { Redirect } from 'react-router-dom';
import firebase from '../../firebase/firebase'
jest.mock('../../firebase/firebase');

describe('DevLogin', () => {
  it('should match snapshot', () => {
    const devLogin = shallow(<DevLogin  />)

    expect(devLogin).toMatchSnapshot();
  });
  
  describe('gitHubLogin', () => {
    let devLogin;

    beforeEach(() => {
      devLogin = shallow(<DevLogin />);
    });
  
    it('should call the expected methods of firebase', () => {
      devLogin.find('button').simulate('click');

  d
      expect(firebase.auth.GithubAuthProvider).toHaveBeenCalled();
      expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
    });
  });

  describe('logInCheck', () => {
    let mockProps;
    let devLogin

    beforeEach(() => {
      mockProps = {
        client: { }
      };
      
      devLogin = shallow(<DevLogin {...mockProps} />);
    });

    it('should call redirect if client is not signed in', () => {

      const expected = devLogin.instance().logInCheck(mockProps.client)

      expect(expected).toEqual(<Redirect to='/dev-login'/>);
    });
  });
});
