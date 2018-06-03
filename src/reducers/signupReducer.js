const initalState = false;

export const signupReducer = (state = initalState, action) => {
  console.log(action.problemID)
  switch (action.type) {
    case 'HANDLE_SIGNUP':
      return ({
        status: action.signup,
        problemID: action.problemID
      });
    default:
      return state;
  }
}