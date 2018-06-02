const initalState = {};

export const problemReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CREATE_PROBLEM_TITLE':
      return {...state, title: action.title};
    case 'CREATE_PROBLEM_BODY':
      return {...state, body: action.body};
    case 'CREATE_PROBLEM_CATEGORIES':
      return {...state, categories: action.categories};
    case 'CREATE_PROBLEM_CLIENT':
      return {...state, client: action.client};
    default:
      return state;
  }
};

// const initalState = null;

// export const problemTitleReducer = (state = initalState, action) => {
//   switch (action.type) {
//     case 'CREATE_PROBLEM_TITLE':
//       return action.title;
//     default:
//       return state;
//   }
// }

// export const problemBodyReducer = (state = initalState, action) => {
//   switch (action.type) {
//     case 'CREATE_PROBLEM_BODY':
//       return action.body;
//     default:
//       return state;
//   }
// }

// export const problemClientReducer = (state = initalState, action) => {
//   switch (action.type) {
//     case 'CREATE_PROBLEM_CLIENT':
//       return action.client;
//     default:
//       return state;
//   }
// }