import { SignUp} from './SignUp';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../helpers/DatabaseHelper.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      writeContributerToDatabase: jest.fn().mockImplementation(() => Promise.resolve({category: 'category'})),
      writeDevProjectToDatabase: jest.fn().mockImplementation(() => Promise.resolve({problem: 'problem'}))
    };
  });
});

describe('SignUp', () => {
  it('should match snapshot', () => {
    const mockProps = {
      dev: {name: 'tony'},
      history: {
        push: jest.fn()
      },
      signup: {
        status: false
      }
    };
    const wrapper = shallow(<SignUp {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('handleInputChange', () => {
    let mockProps;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {name: 'tony'},
        history: {
          push: jest.fn()
        },
        signup: {
          status: false
        }
      };
      mockEvent = {
        target: {
          name: "repo",
          value: 'input value'
        }
      };
      wrapper = shallow(<SignUp {...mockProps} />);
    });

    it('should setState off the params', () => {
      wrapper.instance().handleInputChange(mockEvent);
    
      expect(wrapper.state('repo')).toEqual(mockEvent.target.value);
    });
  });

  describe('handleInputChange', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        dev: {name: 'tony', id: 1},
        history: {
          push: jest.fn()
        },
        signup: {
          status: false,
          problemID: 123
        },
        handleSignup: jest.fn()
      };
      wrapper = shallow(<SignUp {...mockProps} />);
    });

    it('should call given functions', () => {
      wrapper.setState({
        repo: 'repo',
        contact: '@tony'
      });
      wrapper.instance().handleSubmit();
    
      expect(wrapper.instance().database.writeContributerToDatabase).toHaveBeenCalled();
    });
  });
});