import React from 'react';
import { shallow } from 'enzyme';
import SignupButton from './SignupButton';

describe('SignupButton', () => {
  let wrapper;
  let mockHandleSignup;

  beforeEach(() => {
    mockHandleSignup = jest.fn();
    wrapper = shallow(<SignupButton handleSignup={mockHandleSignup} clientID={'clientID'}  />);
  })

  it('should match snapshot', () => {

    expect(wrapper).toMatchSnapshot();

  });
  
  describe('handleClick', () => {
    it('should call prop methods and values', () => {
      wrapper.instance().handleClick()

      expect(mockHandleSignup).toHaveBeenCalled();
    });

    it('should do nothing if state of selected is true', () => {
      wrapper.setState({
        selected: true
      });

      wrapper.instance().handleClick()

      expect(mockHandleSignup).not.toHaveBeenCalled();
      
    });
  });
});