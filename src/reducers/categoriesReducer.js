const initalState = [];

export const categoriesReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
}