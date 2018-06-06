import { ProblemBody, mapStateToProps, mapDispatchToProps} from './ProblemBody';
import React from 'react';
import { shallow } from 'enzyme';


describe('ProblemBody', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {name: 'tony'}
    };
    const wrapper = shallow(<ProblemBody {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleInputChange', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'}
      };
      mockEvent = {
        target: {
          value: 'input value'
        }
      }
      wrapper = shallow(<ProblemBody {...mockProps} />);
    });

    it('should setState off the params', () => {
      wrapper.instance().handleInputChange(mockEvent)
    
      expect(wrapper.state('input')).toEqual(mockEvent.target.value)
    });
  });

  describe('handleSubmit', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        createProblemBody: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      mockEvent = {
        preventDefault: jest.fn()
      };
      wrapper = shallow(<ProblemBody {...mockProps} />);
    });

    it('should call the given methods', () => {
      wrapper.instance().handleSubmit(mockEvent)
    
      expect(wrapper.instance().props.createProblemBody).toHaveBeenCalled();
      expect(wrapper.instance().props.history.push).toHaveBeenCalled();
    });
  });

  describe('submitInput', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        createProblemBody: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      mockEvent = {
        keyCode: 13,
        shiftKey: false,
        preventDefault: jest.fn()
      };
      wrapper = shallow(<ProblemBody {...mockProps} />);
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

  describe('logInCheck', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        createProblemBody: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      wrapper = shallow(<ProblemBody {...mockProps} />);
    });

    it('should redirect to login if no client', () => {
      wrapper.instance().logInCheck({})
      
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith("/client-login");
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: 'value',
        problemClient: 'value',
        problemTitle: 'value',
        problemBody: 'value'
      }

      const expected = {
        body: "value", 
        client: "value", 
        clientID: "value", 
        title: "value"
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
      
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch on createCompletedProblem with the correct params', () => {

      const mockDispatch = jest.fn();
      const body = {prob: 'prob'}
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'CREATE_PROBLEM_BODY',
        body
      };
      
      mappedProps.createProblemBody(body);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});