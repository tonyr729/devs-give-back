import { DevProfile, mapStateToProps, mapDispatchToProps} from './DevProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';


describe('DevProfile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      dev: {
        name: 'Tony'
      },
      addProjects: jest.fn()
    }
    const wrapper = shallow(<DevProfile {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('displayProjects', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {
          name: 'Tony'
        },
        projects: [{title: 'title'}, {title: 'title'}],
        addProjects: jest.fn()
      };
      wrapper = shallow(<DevProfile {...mockProps} />);
    })

    it('should return project cards if projects exists', () => {
      expect(wrapper.find('.project-card').length).toEqual(2)
    });

    it('should return message if no projects exist', () => {
      const mockProps = {
        dev: {
          name: 'Tony'
        },
        projects: [],
        addProjects: jest.fn()
      };
      const wrapper = shallow(<DevProfile {...mockProps} />);
      expect(wrapper.find('.info-text').length).toEqual(1)
    });
  });

  describe('statusCheck', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {
          name: 'Tony'
        },
        projects: [{title: 'title'}, {title: 'title'}],
        addProjects: jest.fn()
      };
      wrapper = shallow(<DevProfile {...mockProps} />);
    })

    it('should redirect if there is no dev', () => {
      const expected = (<Redirect to='/dev-login'/>)
      const actual = wrapper.instance().statusCheck({})
      expect(actual).toEqual(expected)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch on signInDev with the correct params', () => {

      const mockDispatch = jest.fn();
      const user = {name: 'Tony'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SIGN_IN_DEV',
        user
      };
      
      mappedProps.signInDev(user);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });

    it('should call dispatch on addProjects with the correct params', () => {

      const mockDispatch = jest.fn();
      const projects = {projects: 'projects'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_PROJECTS',
        projects
      };
      
      mappedProps.addProjects(projects);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });
  });
});