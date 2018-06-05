import { problemReducer } from './problemReducer';

describe('problem reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(problemReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new problem title when called', () => {
    let initialState = {};
    let title = 'awesome title';
    let expected = {title};
    let addProblemTitle = {
      type: 'CREATE_PROBLEM_TITLE',
      title
    };

    let newState = problemReducer(initialState, addProblemTitle);

    expect(newState).toEqual(expected);
  });

  it('returns state with new problem body when called', () => {
    let initialState = {};
    let body = 'Awesome body';
    let expected = {body}
    let addProblemBody = {
      type: 'CREATE_PROBLEM_BODY',
      body
    };

    let newState = problemReducer(initialState, addProblemBody);

    expect(newState).toEqual(expected);
  });

  it('returns state with new problem repo when called', () => {
    let initialState = {};
    let repo = 'Awesome repo';
    let expected = {repo}
    let addProblemRepo = {
      type: 'CREATE_PROBLEM_REPO',
      repo
    };

    let newState = problemReducer(initialState, addProblemRepo);

    expect(newState).toEqual(expected);
  });

  it('returns state with new problem client when called', () => {
    let initialState = {};
    let client = 'Awesome client';
    let expected = {client}
    let addProblemClient = {
      type: 'CREATE_PROBLEM_CLIENT',
      client
    };

    let newState = problemReducer(initialState, addProblemClient);

    expect(newState).toEqual(expected);
  });

  it('returns state with new problem categories when called', () => {
    let initialState = {};
    let categories = 'Awesome categories';
    let expected = {categories}
    let addProblemCategories = {
      type: 'SELECT_CATEGORIES',
      categories
    };

    let newState = problemReducer(initialState, addProblemCategories);

    expect(newState).toEqual(expected);
  });
});

// const initalState = {};

// export const problemReducer = (state = initalState, action) => {
//   switch (action.type) {
//     case 'CREATE_PROBLEM_TITLE':
//       return {...state, title: action.title};
//     case 'CREATE_PROBLEM_BODY':
//       return {...state, body: action.body};
//     case 'CREATE_PROBLEM_REPO':
//       return {...state, repo: action.repo};
//     case 'CREATE_PROBLEM_CLIENT':
//       return {...state, client: action.client};
//     case 'SELECT_CATEGORIES':
//       return {...state, categories: action.categories};
//     default:
//       return state;
//   }
// };