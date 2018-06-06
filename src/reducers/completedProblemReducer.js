const initalState = {};

export const completedProblemReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_COMPLETED_PROBLEM':
      return action.problem;
    default:
      return state;
  }
};