export const signInClient = (user) => ({
  type: 'SIGN_IN_CLIENT',
  user
});

export const clientError = (error) => ({
  type: 'CLIENT_ERROR',
  error
});

export const createProblemClient = (client) => ({
  type: 'CREATE_PROBLEM_CLIENT',
  client
});

export const createProblemTitle = (title) => ({
  type: 'CREATE_PROBLEM_TITLE',
  title
});

export const createProblemBody = (body) => ({
  type: 'CREATE_PROBLEM_BODY',
  body
});

