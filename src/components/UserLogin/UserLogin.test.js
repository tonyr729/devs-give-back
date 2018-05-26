import { shallow, mount } from 'enzyme';
import React from 'react';
import { UserLogin } from './UserLogin';
import firebase from '../../firebase/firebase'
jest.mock('../../firebase/firebase')

describe('UserLogin', () => {
  it('should match snapshot', () => {
    const userLogin = shallow(<UserLogin  />);

    expect(userLogin).toMatchSnapshot();
  });

  describe('googleLogin', () => {
    let userLogin;
    beforeEach(() => {
      userLogin = shallow(<UserLogin />);
    });

    it('should call the expected methods of firebase', () => {
      userLogin.find('button').simulate('click');

      expect(firebase.auth().signInWithPopup).toHaveBeenCalled()
      expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled()

    });
  });
  
});
