import { signupReducer } from './signupReducer';

describe('signup reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = false;
    
    expect(signupReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new signup when called', () => {
    let initialState = false;
    let signup = {status: true, problemID: 14};
    let createdSignup = {
      type: 'HANDLE_SIGNUP',
      status: true,
      problemID: 14
    };

    let newState = signupReducer(initialState, createdSignup);

    expect(newState).toEqual(signup);
  });
});