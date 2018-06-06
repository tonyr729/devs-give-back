import { NewProfile, mapStateToProps, mapDispatchToProps} from './NewProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';


describe('NewProfile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {
        name: 'Tony'
      },
      problem: {
        categories: ['category']
      }
    }
    const wrapper = shallow(<NewProfile {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('logInCheck', () => {
    let wrapper;
    let mockProps

    beforeEach(() => {
      mockProps = {
        client: {},
        problem: {
          categories: ['category']
        }
      };
      wrapper = shallow(<NewProfile {...mockProps} />)
    });
    
    it('should redirect if there is no client', () => {
      
      const actual = wrapper.instance().logInCheck(mockProps.client)
      expect(actual).toEqual(<Redirect to='/client-login'/>)
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: {name: 'Tony'},
        problem: {
          categories: ['category']
        }
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    });
  });
});