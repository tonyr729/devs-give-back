import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { devLoginReducer, devErrorReducer } from './devLoginReducer';
import { problemReducer } from './problemReducer';
import { categoriesReducer } from './categoriesReducer';
import { allProblemsReducer } from './allProblemsReducer';
import { signupReducer } from './signupReducer';
import { projectsReducer } from './projectsReducer';

export const rootReducer = combineReducers({
  client: clientLoginReducer,
  clientError: clientErrorReducer,
  dev: devLoginReducer,
  projects: projectsReducer,
  signup: signupReducer,
  devError: devErrorReducer,
  problem: problemReducer,
  categories: categoriesReducer,
  allProblems: allProblemsReducer
}); 