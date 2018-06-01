import { PriorProblem } from './PriorProblem';
import React from 'react';
import { shallow } from 'enzyme';

describe('PriorProblem', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PriorProblem />);

    expect(wrapper).toMatchSnapshot();
  });

  
});