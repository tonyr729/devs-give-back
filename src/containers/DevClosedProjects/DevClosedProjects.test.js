import React from 'react';
import { shallow } from 'enzyme';
import { DevClosedProjects } from "./DevClosedProjects";


describe('DevClosedProjects', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DevClosedProjects/>);

    expect(wrapper).toMatchSnapshot();
  });
});