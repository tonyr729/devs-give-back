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

  describe('mapStateToProps', () => {
    it('returns an object with Dev info', () => {

      const mockState = {
        dev: {name: 'Tony'},
        allProblems: [{problem: 'problem'}],
        signup: {status: true}
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch on addAllProblems the correct params', () => {

      const mockDispatch = jest.fn();
      const problems = {problem: 'problem'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_ALL_PROBLEMS',
        problems
      };
      
      mappedProps.addAllProblems(problems);
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

    it('should call dispatch on handleSignup with the correct params', () => {

      const mockDispatch = jest.fn();
      const status = {status: true}
      const problemID = 123
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'HANDLE_SIGNUP',
        status,
        problemID
      };
      
      mappedProps.handleSignup(status, problemID);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });
  });
});