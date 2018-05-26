import { shallow, mount } from 'enzyme';
import React from 'react';
import { ClientLogin } from './ClientLogin';
import firebase from '../../firebase/firebase'
jest.mock('../../firebase/firebase')

describe('ClientLogin', () => {
  it('should match snapshot', () => {
    const clientLogin = shallow(<ClientLogin  />);

    expect(clientLogin).toMatchSnapshot();
  });

  describe('googleLogin', () => {
    let clientLogin;
    beforeEach(() => {
      clientLogin = shallow(<ClientLogin />);
    });

    it('should call the expected methods of firebase', () => {
      clientLogin.find('button').simulate('click');

      expect(firebase.auth().signInWithPopup).toHaveBeenCalled()
      expect(firebase.auth.GoogleAuthProvider).toHaveBeenCalled()

    });
  });
  
});
