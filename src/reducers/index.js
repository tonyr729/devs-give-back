import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';
import { problemTitleReducer, problemBodyReducer, problemClientReducer } from './problemReducer';

export const rootReducer = combineReducers({
  user: clientLoginReducer,
  clientError: clientErrorReducer,
  problemClient: problemClientReducer,
  problemTitle: problemTitleReducer, 
  problemBody: problemBodyReducer
}); 
