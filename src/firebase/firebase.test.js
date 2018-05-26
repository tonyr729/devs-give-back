import { shallow, mount } from 'enzyme';
import firebase from './firebase';

describe('UserLogin', () => {
  it('should initialize app', () => {
    console.log(firebase.initializeApp)
    expect(firebase.initializeApp).toHaveBeenCalled();
  });
});