import { ProblemTitle, mapStateToProps, mapDispatchToProps} from './ProblemTitle';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../helpers/DatabaseHelper.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      findMatchingProblem: jest.fn().mockImplementation(() => Promise.resolve({category: 'category'})),
      writeProblemToDatabase: jest.fn().mockImplementation(() => Promise.resolve({problem: 'problem'}))
    };
  });
});

describe('ProblemTitle', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {name: 'tony'},
      history: {
        push: jest.fn()
      }
    };
    const wrapper = shallow(<ProblemTitle {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        history: {
          push: jest.fn()
        }
      };
      wrapper = shallow(<ProblemTitle {...mockProps} />)
      wrapper.instance().logInCheck = jest.fn();
    });
    
    it('should call given functions on mount of component', async () => {
      // wrapper.instance().problemCheck = jest.fn().mockImplementation(() => Promise.resolve({category: 'category'}));
      // expect(await wrapper.instance().problemCheck).toHaveBeenCalled();
      // expect(wrapper.instance().logInCheck).toHaveBeenCalled();
    });
  });

  describe('problemCheck', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        history: {
          push: jest.fn()
        }
      };
      wrapper = shallow(<ProblemTitle {...mockProps} />)
    });
    
    it('should redirect if no client', async () => {
      wrapper.instance().problemCheck({})

      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith('/client-login')
    });

    it('should call database method', async () => {
      wrapper.instance().problemCheck({name: 'tony'})

      expect(wrapper.instance().database.findMatchingProblem).toHaveBeenCalled()
    });

    it('should redirect if no existing problem', async () => {
      wrapper.instance().problemCheck({name: 'tony'})

      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith('/prior-problem')
    });
  });

  describe('handleInputChange', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        history: {
          push: jest.fn()
        }
      };
      mockEvent = {
        target: {
          value: 'input value'
        }
      }
      wrapper = shallow(<ProblemTitle {...mockProps} />);
    });

    it('should setState off the params', () => {
      wrapper.instance().handleInputChange(mockEvent)
    
      expect(wrapper.state('input')).toEqual(mockEvent.target.value)
    });
  });

  describe('handleInputChange', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        createProblemTitle: jest.fn(),
        createProblemClient: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      mockEvent = {
        preventDefault: jest.fn(),
        target: {
          value: 'input value'
        }
      }
      wrapper = shallow(<ProblemTitle {...mockProps} />);
    });

    it('should setState off the params', () => {
      wrapper.instance().handleSubmit(mockEvent)
    
      expect(wrapper.instance().props.createProblemTitle).toHaveBeenCalled();
      expect(wrapper.instance().props.createProblemClient).toHaveBeenCalled();
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith("/problem-body");
    });
  });

  describe('submitInput', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        createProblemTitle: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      mockEvent = {
        keyCode: 13,
        shiftKey: false,
        preventDefault: jest.fn()
      };
      wrapper = shallow(<ProblemTitle {...mockProps} />);
    });

    it('should call the given methods if keyCodes match', () => {
      wrapper.instance().handleSubmit = jest.fn();
      
      wrapper.instance().submitInput(mockEvent);
    
      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    });

    it('should do nothing if keyCodes dont match', () => {
      mockEvent = {
        keyCode: 11,
        shiftKey: true,
        preventDefault: jest.fn()
      };
      wrapper.instance().handleSubmit = jest.fn();

      wrapper.instance().submitInput(mockEvent);
    
      expect(wrapper.instance().handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: 'value',
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch on createProblemClient with the correct params', () => {

      const mockDispatch = jest.fn();
      const client = {prob: 'prob'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'CREATE_PROBLEM_CLIENT',
        client
      };
      
      mappedProps.createProblemClient(client);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch on createProblemTitle with the correct params', () => {

      const mockDispatch = jest.fn();
      const title = {prob: 'prob'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'CREATE_PROBLEM_TITLE',
        title
      };
      
      mappedProps.createProblemTitle(title);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});