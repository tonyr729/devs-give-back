const initalState = {};

export const clientLoginReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SIGN_IN_CLIENT':
      return action.user;
    default:
      return state;
  }
}

export const clientErrorReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CLIENT_ERROR':
      return action.error;
    default:
      return state;
  }
}