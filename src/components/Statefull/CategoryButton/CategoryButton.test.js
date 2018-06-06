import React from 'react';
import { shallow } from 'enzyme';
import CategoryButton from './CategoryButton';

describe('CategoryButton', () => {
  let wrapper;
  let mockSelectCategory;

  beforeEach(() => {
    mockSelectCategory = jest.fn();
    wrapper = shallow(<CategoryButton selectCategory={mockSelectCategory} category={'category'}  />);
  })

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();

  });
  
  describe('handleClick', () => {
    it('should call prop methods and values', () => {
      wrapper.instance().handleClick()

      expect(mockSelectCategory).toHaveBeenCalled();
    });
  });
});