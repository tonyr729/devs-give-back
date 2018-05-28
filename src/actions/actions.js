export const signInClient = (user) => ({
  type: 'SIGN_IN_CLIENT',
  user
})

export const clientError = (error) => ({
  type: 'CLIENT_ERROR',
  error
})