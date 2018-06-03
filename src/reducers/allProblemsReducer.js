const initalState = [];

export const allProblemsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_ALL_PROBLEMS':
      return action.problems;
    default:
      return state;
  }
}