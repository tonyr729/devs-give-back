import { shallow } from 'enzyme';
import React from 'react';
import { ErrorPage } from './ErrorPage'

describe('ErrorPage', () => {
  it('should match snapshot', () => {
    const errorPage = shallow(<ErrorPage  />)

    expect(errorPage).toMatchSnapshot();
  });
});