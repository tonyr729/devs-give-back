import { rootReducer } from './index';
import { createStore } from 'redux';
import { clientLoginReducer } from './clientLoginReducer';


describe('Combine Reducers', () => {
  it('returns rootReducer when called', () => {
    let store = createStore(rootReducer);

    expect(store.getState().client).toEqual(clientLoginReducer(undefined, {}));
  });
});