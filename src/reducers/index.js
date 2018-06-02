import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { devLoginReducer, devErrorReducer } from './devLoginReducer';
import { problemReducer } from './problemReducer';
import { categoriesReducer } from './categoriesReducer';

export const rootReducer = combineReducers({
  client: clientLoginReducer,
  clientError: clientErrorReducer,
  dev: devLoginReducer,
  devError: devErrorReducer,
  categories: categoriesReducer,
  problem: problemReducer
}); 