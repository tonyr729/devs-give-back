import { completedProblemReducer } from './completedProblemReducer';

describe('completedProblem reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = {};
    
    expect(completedProblemReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new completedProblem when called', () => {
    let initialState = {};
    let problem = {problem: 'problem'};
    let createdCompletedProblem = {
      type: 'CREATE_COMPLETED_PROBLEM',
      problem
    };

    let newState = completedProblemReducer(initialState, createdCompletedProblem);

    expect(newState).toEqual(problem);
  });
});