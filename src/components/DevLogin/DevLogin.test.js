import { shallow } from 'enzyme';
import React from 'react';
import { DevLogin } from './DevLogin'

describe('DevLogin', () => {
  it('should match snapshot', () => {
    const devLogin = shallow(<DevLogin  />)

    expect(devLogin).toMatchSnapshot();
  });
});