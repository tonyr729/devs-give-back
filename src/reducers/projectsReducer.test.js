import { projectsReducer } from './projectsReducer';

describe('projects reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = null;
    
    expect(projectsReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new projects when called', () => {
    let initialState = null;
    let projects = {project: 'project'};
    let createdProjects = {
      type: 'ADD_PROJECTS',
      projects
    };

    let newState = projectsReducer(initialState, createdProjects);

    expect(newState).toEqual(projects);
  });
});