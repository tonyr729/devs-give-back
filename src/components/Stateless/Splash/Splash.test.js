import { shallow } from 'enzyme';
import React from 'react';
import { Splash } from './Splash';

describe('Splash', () => {
  it('should match snapshot', () => {
    const splash = shallow(<Splash  />);

    expect(splash).toMatchSnapshot();
  });
});