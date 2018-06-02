const initalState = {};

export const problemReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_TITLE':
      return {...state, title: action.title};
    case 'CREATE_PROBLEM_BODY':
      return {...state, body: action.body};
    case 'SELECT_CATEGORIES':
      return {...state, categories: action.categories};
    case 'CREATE_PROBLEM_CLIENT':
      return {...state, client: action.client};
    default:
      return state;
  }
};