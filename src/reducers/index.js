import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { devLoginReducer, devErrorReducer } from './devLoginReducer';
import { problemTitleReducer, problemBodyReducer, problemClientReducer } from './problemReducer';

export const rootReducer = combineReducers({
  client: clientLoginReducer,
  clientError: clientErrorReducer,
  dev: devLoginReducer,
  devError: devErrorReducer,
  problemClient: problemClientReducer,
  problemTitle: problemTitleReducer, 
  problemBody: problemBodyReducer
}); 
