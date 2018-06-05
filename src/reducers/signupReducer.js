const initalState = false;

export const signupReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'HANDLE_SIGNUP':
      return ({
        status: action.status,
        problemID: action.problemID
      });
    default:
      return state;
  }
}