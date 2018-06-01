import { ClientProfile } from './ClientProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';

describe('ClientProfile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {
        name: 'Tony'
      }
    }
    const wrapper = shallow(<ClientProfile {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });
  describe('logInCheck', () => {
    
    it('should redirect if there is no client', () => {
      const mockProps = {
        client: {}
      };
      
      const wrapper = shallow(<ClientProfile {...mockProps} />)

      const actual = wrapper.instance().logInCheck(mockProps)
      expect(actual).toEqual(<Redirect to='/client-login'/>)
    });
  });
});