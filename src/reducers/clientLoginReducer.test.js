import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';

describe('clientLogin reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(clientLoginReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new clientLogin when called', () => {
    let initialState = {};
    let user = {user: 'login'};
    let signInClient = {
      type: 'SIGN_IN_CLIENT',
      user
    };

    let newState = clientLoginReducer(initialState, signInClient);

    expect(newState).toEqual(user);
  });
});

describe('clientError reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(clientErrorReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new clientError when called', () => {
    let initialState = {};
    let error = {error: 'error'};
    let errorClient = {
      type: 'CLIENT_ERROR',
      error
    };

    let newState = clientErrorReducer(initialState, errorClient);

    expect(newState).toEqual(error);
  });
});