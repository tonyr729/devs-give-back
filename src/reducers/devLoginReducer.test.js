import { devLoginReducer, devErrorReducer } from './devLoginReducer';

describe('devLogin reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(devLoginReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new devLogin when called', () => {
    let initialState = {};
    let user = {user: 'login'};
    let signIndev = {
      type: 'SIGN_IN_DEV',
      user
    };

    let newState = devLoginReducer(initialState, signIndev);

    expect(newState).toEqual(user);
  });
});

describe('devError reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(devErrorReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new devError when called', () => {
    let initialState = {};
    let error = {error: 'error'};
    let errordev = {
      type: 'DEV_ERROR',
      error
    };

    let newState = devErrorReducer(initialState, errordev);

    expect(newState).toEqual(error);
  });
});