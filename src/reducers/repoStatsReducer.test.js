import { repoStatsReducer } from './repoStatsReducer';

describe('repoStats reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = null;
    
    expect(repoStatsReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new repoStats when called', () => {
    let initialState = null;
    let stats = {stats: 'stats'};
    let createdrepoStats = {
      type: 'ADD_REPO_STATS',
      stats
    };

    let newState = repoStatsReducer(initialState, createdrepoStats);

    expect(newState).toEqual(stats);
  });
});