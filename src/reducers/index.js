import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { devLoginReducer, devErrorReducer } from './devLoginReducer';
import { problemReducer } from './problemReducer';
import { categoriesReducer } from './categoriesReducer';
import { allProblemsReducer } from './allProblemsReducer';
import { signupReducer } from './signupReducer';

export const rootReducer = combineReducers({
  client: clientLoginReducer,
  clientError: clientErrorReducer,
  dev: devLoginReducer,
  devError: devErrorReducer,
  categories: categoriesReducer,
  problem: problemReducer,
  allProblems: allProblemsReducer,
  signup: signupReducer
}); 