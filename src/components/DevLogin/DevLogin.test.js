import { shallow } from 'enzyme';
import React from 'react';
import { DevLogin } from './DevLogin';
import firebase from '../../firebase/firebase';
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

  
      expect(firebase.auth.GithubAuthProvider).toHaveBeenCalled();
      expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
    });
  });
});


  
