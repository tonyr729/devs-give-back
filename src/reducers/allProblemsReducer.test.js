import { allProblemsReducer } from './allProblemsReducer';

describe('allProblems reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = [];
    
    expect(allProblemsReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new problems when called', () => {
    let initialState = [];
    let problems = {problem: 'problem'};
    let addAllProblems = {
      type: 'ADD_ALL_PROBLEMS',
      problems
    };

    let newState = allProblemsReducer(initialState, addAllProblems);

    expect(newState).toEqual(problems);
  });
});