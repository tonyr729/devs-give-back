const initalState = null;

export const repoStatsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_REPO_STATS':
      return action.stats;
    default:
      return state;
  }
}