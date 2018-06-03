const initalState = null;

export const projectsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_PROJECTS':
      return action.projects;
    default:
      return state;
  }
}