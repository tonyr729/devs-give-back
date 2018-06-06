import { 
  signInClient, 
  clientError, 
  signInDev, 
  devError, 
  createProblemClient, 
  createProblemTitle, 
  createProblemBody,
  createCompletedProblem,
  addCategories,
  addAllProblems,
  addProjects,
  selectCategories,
  handleSignup,
  addRepoStats
} from "./actions";

describe('signInClient', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'SIGN_IN_CLIENT', user: 'tony'};

    const actual = signInClient('tony');

    expect(actual).toEqual(expected);
  });
});

describe('clientError', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CLIENT_ERROR', error: 'client error'};
    
    const actual = clientError('client error');

    expect(actual).toEqual(expected);
  });
});

describe('signInDev', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'SIGN_IN_DEV', user: 'tony'};
    
    const actual = signInDev('tony');

    expect(actual).toEqual(expected);
  });
});

describe('devError', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'DEV_ERROR', error: 'dev error'};
    
    const actual = devError('dev error');

    expect(actual).toEqual(expected);
  });
});

describe('createProblemClient', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_CLIENT', client: 'tony'};
    
    const actual = createProblemClient('tony');

    expect(actual).toEqual(expected);
  });
});

describe('createProblemTitle', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_TITLE', title: 'problem title'};
    
    const actual = createProblemTitle('problem title');

    expect(actual).toEqual(expected);
  });
});

describe('createProblemBody', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'CREATE_PROBLEM_BODY', body: 'problem body'};
    
    const actual = createProblemBody('problem body');

    expect(actual).toEqual(expected);
  });
});

describe('createCompletedProblem', () => {
  it('should return expected object based on params', () => {
    const expected = {
      type: 'CREATE_COMPLETED_PROBLEM', 
      problem: {
        body: 'problem body'
      }
    };
    
    const actual = createCompletedProblem({body: 'problem body'});

    expect(actual).toEqual(expected);
  });
});

describe('addCategories', () => {
  it('should return expected object based on params', () => {
    const expected = {
      type: 'ADD_CATEGORIES', 
      categories: {
        category: 'category'
      }
    };
    
    const actual = addCategories({category: 'category'});

    expect(actual).toEqual(expected);
  });
});

describe('addAllProblems', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'ADD_ALL_PROBLEMS', problems: {problem: 'problem'}};
    
    const actual = addAllProblems({problem: 'problem'});

    expect(actual).toEqual(expected);
  });
});

describe('addProjects', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'ADD_PROJECTS', projects: {project: 'project'}};
    
    const actual = addProjects({project: 'project'});

    expect(actual).toEqual(expected);
  });
});

describe('selectCategories', () => {
  it('should return expected object based on params', () => {
    const expected = {
      type: 'SELECT_CATEGORIES', 
      categories: {
        category: 'category'
      }
    };
    
    const actual = selectCategories({category: 'category'});

    expect(actual).toEqual(expected);
  });
});

describe('handleSignup', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'HANDLE_SIGNUP', signup: true, problemID: 34};
    
    const actual = handleSignup(true, 34);

    expect(actual).toEqual(expected);
  });
});

describe('addRepoStats', () => {
  it('should return expected object based on params', () => {
    const expected = {type: 'ADD_REPO_STATS', stats: {stuff: 'junk'}};
    
    const actual = addRepoStats({stuff: 'junk'});

    expect(actual).toEqual(expected);
  });
});
