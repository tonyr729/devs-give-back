import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { devLoginReducer, devErrorReducer } from './devLoginReducer';
import { problemReducer } from './problemReducer';

export const rootReducer = combineReducers({
  client: clientLoginReducer,
  clientError: clientErrorReducer,
  dev: devLoginReducer,
  devError: devErrorReducer,
  problem: problemReducer
}); 

// problemClient: problemClientReducer,
// problemTitle: problemTitleReducer, 
// problemBody: problemBodyReducer