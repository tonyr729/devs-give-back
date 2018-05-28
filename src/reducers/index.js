import { combineReducers } from 'redux';
import { clientLoginReducer, clientErrorReducer } from './clientLoginReducer';

export const rootReducer = combineReducers({
  user: clientLoginReducer,
  clientError: clientErrorReducer
}); 
