import { DevProjectList, mapStateToProps, mapDispatchToProps} from './DevProjectList';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';
jest.mock('../../helpers/DatabaseHelper.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      pullProjectsFromDatabase: jest.fn().mockImplementation(() => Promise.resolve({project: 'project'})),
      pullProblemsFromDatabase: jest.fn().mockImplementation(() => Promise.resolve({problem: 'problem'}))
    };
  });
});



describe('DevProjectList', () => {
  it('should match snapshot', () => {
    const mockProps = {
      dev: {
        name: 'Tony'
      },
      signup: {status: true},
      addAllProblems: jest.fn(),
      addProjects: jest.fn(),
      allProblems: [{categories: ['category']}, {categories: ['category']}]
    }
    const wrapper = shallow(<DevProjectList {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {
          name: 'Tony'
        },
        signup: {status: true},
        addAllProblems: jest.fn(),
        addProjects: jest.fn(),
        allProblems: [{categories: ['category']}, {categories: ['category']}]
      };
      wrapper = shallow(<DevProjectList {...mockProps} />);
    })

    it('should call the required methods on mount of component', () => {
      expect(wrapper.instance().database.pullProjectsFromDatabase).toHaveBeenCalled();
      expect(wrapper.instance().database.pullProblemsFromDatabase).toHaveBeenCalled();
      expect(wrapper.instance().props.addAllProblems).toHaveBeenCalled()
      expect(wrapper.instance().props.addProjects).toHaveBeenCalled()
    });
  });

  describe('displayAllProblems', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {
          name: 'Tony'
        },
        signup: {status: true},
        addAllProblems: jest.fn(),
        addProjects: jest.fn(),
        allProblems: [{categories: ['category']}, {categories: ['category']}]
      };
      wrapper = shallow(<DevProjectList {...mockProps} />);
    })

    it('should return all problems if problems exist', () => {
      expect(wrapper.find('.problem-card').length).toEqual(2)
    });
  });

  describe('logInCheck', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {},
        signup: {status: true},
        addAllProblems: jest.fn(),
        addProjects: jest.fn(),
        allProblems: [{categories: ['category']}, {categories: ['category']}]
      };
      wrapper = shallow(<DevProjectList {...mockProps} />);
    })

    it('should redirect if no dev', () => {
      const expected = (<Redirect to='/dev-login'/>)
      const actual = wrapper.instance().logInCheck({});

      expect(actual).toEqual(expected)
    });
  });
});