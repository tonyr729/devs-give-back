import { shallow } from 'enzyme';
import React from 'react';
import { Choice } from './Choice';

describe('Choice', () => {
  it('should match snapshot', () => {
    const choice = shallow(<Choice  />);

    expect(choice).toMatchSnapshot();
  });
});