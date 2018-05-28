const initalState = '';

export const problemTitleReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_TITLE':
      return action.title;
    default:
      return state;
  }
}

export const problemBodyReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_BODY':
      return action.body;
    default:
      return state;
  }
}

export const problemClientReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_CLIENT':
      return action.client;
    default:
      return state;
  }
}