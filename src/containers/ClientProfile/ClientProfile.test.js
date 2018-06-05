import { ClientProfile } from './ClientProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';
jest.mock('../../helpers/APIHelper', () => {
  return jest.fn().mockImplementation(() => {
    return {
      fetchNumberOfHours: jest.fn().mockImplementation(() => Promise.resolve(['hour1', 'hour2'])),
      fetchNumberOfUpdates: jest.fn().mockImplementation(() => Promise.resolve(['commit1', 'commit2'])),
      fetchNumberOfContributers: jest.fn().mockImplementation(() => Promise.resolve(['person1', 'person2'])),
      fetchLinesOfCode: jest.fn().mockImplementation(() => Promise.resolve(['2345', '-234']))
    };
  });
});

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