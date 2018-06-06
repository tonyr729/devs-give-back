import firebase from './firebase';

describe('UserLogin', () => {
  it('should initialize app', () => {
    expect(firebase.initializeApp).toHaveBeenCalled();
  });
});