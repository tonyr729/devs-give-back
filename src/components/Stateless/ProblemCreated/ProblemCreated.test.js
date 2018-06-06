import { shallow } from 'enzyme';
import React from 'react';
import { ProblemCreated } from './ProblemCreated';

describe('ProblemCreated', () => {
  it('should match snapshot', () => {
    const problemCreated = shallow(<ProblemCreated  />);

    expect(problemCreated).toMatchSnapshot();
  });
});