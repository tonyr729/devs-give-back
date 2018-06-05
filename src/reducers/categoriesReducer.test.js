import { categoriesReducer } from './categoriesReducer';

describe('categories reducer', () => {
  it('returns default state if the action type doesn\'t match', () => {
    let initialState = [];
    
    expect(categoriesReducer(undefined, {})).toEqual(initialState);
  });

  it('returns state with new categories when called', () => {
    let initialState = [];
    let categories = {category: 'category'};
    let addCategories = {
      type: 'ADD_CATEGORIES',
      categories
    };

    let newState = categoriesReducer(initialState, addCategories);

    expect(newState).toEqual(categories);
  });
});