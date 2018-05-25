import { shallow } from 'enzyme';
import React from 'react';
import { Sort } from './Sort'

describe('Sort', () => {
  it('should match snapshot', () => {
    const sort = shallow(<Sort  />)

    expect(sort).toMatchSnapshot();
  });
});