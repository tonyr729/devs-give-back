const initalState = {};

export const devLoginReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SIGN_IN_DEV':
      return action.user;
    default:
      return state;
  }
};

export const devErrorReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'DEV_ERROR':
      return action.error;
    default:
      return state;
  }
};