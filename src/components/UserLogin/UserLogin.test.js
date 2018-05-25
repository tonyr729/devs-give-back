import { shallow } from 'enzyme';
import React from 'react';
import { UserLogin } from './UserLogin'

describe('UserLogin', () => {
  it('should match snapshot', () => {
    const userLogin = shallow(<UserLogin  />)

    expect(userLogin).toMatchSnapshot();
  });
});