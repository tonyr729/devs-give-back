import { rootReducer } from './index'
import { createStore } from 'redux';
import { allProblemsReducer } from './allProblemsReducer';
import { categoriesReducer } from './categoriesReducer';
import { clientLoginReducer } from './clientLoginReducer';


describe('Combine Reducers', () => {
  it('returns rootReducer when called', () => {
    let store = createStore(rootReducer)

    expect(store.getState().client).toEqual(clientLoginReducer(undefined, {}))
  });
})