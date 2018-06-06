import { PriorProblem, mapStateToProps, mapDispatchToProps} from './PriorProblem';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../helpers/DatabaseHelper.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      findMatchingProblem: jest.fn().mockImplementation(() => 
        Promise.resolve({project: 'project'})),
      pullProblemsFromDatabase: jest.fn().mockImplementation(() => 
        Promise.resolve({problem: 'problem'}))
    };
  });
});

describe('PriorProblem', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PriorProblem />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<PriorProblem />);
    });

    it('should do nothing if there is no client', () => {
      expect(wrapper.instance().database.findMatchingProblem).not.toHaveBeenCalled();
    });
    
    it('should should call given functions if there is a client', async () => {
      const mockProps = {
        client: {
          id: 123
        },
        createCompletedProblem: jest.fn()
      };

      wrapper = shallow(<PriorProblem {...mockProps}/>);

      expect(wrapper.instance().database.findMatchingProblem).toHaveBeenCalled();
      expect(await wrapper.instance().props.createCompletedProblem).toHaveBeenCalled();
    });
  });

  describe('handleClick', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {
          id: 123
        },
        createCompletedProblem: jest.fn(),
        clientsProblem: {},
        history: { push: jest.fn() }
      };
      wrapper = shallow(<PriorProblem {...mockProps}/>);
    });
    
    it('should should redirect to client login if no problem', () => {
      wrapper.instance().handleClick();
      
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith("/client-login");
    });
    
    it('should should redirect to client profile if no problem', () => {
      mockProps = {
        client: {
          id: 123
        },
        createCompletedProblem: jest.fn(),
        clientsProblem: {prob: 'prob'},
        history: { push: jest.fn() }
      };
      wrapper =  shallow(<PriorProblem {...mockProps}/>);
      
      wrapper.instance().handleClick();

      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith("/client-profile");
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: {name: 'Tony'},
        clientsProblem: {problem: 'prob'}
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch on createCompletedProblem with the correct params', () => {

      const mockDispatch = jest.fn();
      const problem = {prob: 'prob'};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'CREATE_COMPLETED_PROBLEM',
        problem
      };
      
      mappedProps.createCompletedProblem(problem);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});