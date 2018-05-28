import { shallow } from 'enzyme';
import React from 'react';
import { SplitLogin } from './SplitLogin'

describe('SplitLogin', () => {
  it('should match snapshot', () => {
    const splitLogin = shallow(<SplitLogin  />)

    expect(splitLogin).toMatchSnapshot();
  });
});