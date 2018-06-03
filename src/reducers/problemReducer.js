const initalState = {};

export const problemReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_TITLE':
      return {...state, title: action.title};
    case 'CREATE_PROBLEM_BODY':
      return {...state, body: action.body};
    case 'CREATE_PROBLEM_REPO':
      return {...state, repo: action.repo};
    case 'CREATE_PROBLEM_CLIENT':
      return {...state, client: action.client};
    case 'SELECT_CATEGORIES':
      return {...state, categories: action.categories};
    default:
      return state;
  }
};