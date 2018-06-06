import { 
  ClientProfile, 
  mapStateToProps, 
  mapDispatchToProps
} from './ClientProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';
jest.mock('../../helpers/APIHelper', () => {
  return jest.fn().mockImplementation(() => {
    return {
      fetchNumberOfHours: jest.fn().mockImplementation(() => 
        Promise.resolve(['hour1', 'hour2'])),
      fetchNumberOfUpdates: jest.fn().mockImplementation(() => 
        Promise.resolve(['commit1', 'commit2'])),
      fetchNumberOfContributers: jest.fn().mockImplementation(() => 
        Promise.resolve(['person1', 'person2'])),
      fetchLinesOfCode: jest.fn().mockImplementation(() => 
        Promise.resolve(['2345', '-234']))
    };
  });
});

describe('ClientProfile', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {
        name: 'Tony'
      }
    };
    const wrapper = shallow(<ClientProfile {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('displayStats', () => {
    
    it('should return problem stats if props.repoStats exist', () => {
      const newWrapper = shallow(<ClientProfile client={{}} repoStats={true}/>);

      expect(newWrapper.find('p').length).toEqual(9);
    });
  });

  describe('displayCategories', () => {
    let wrapper;
    let mockProps;

    beforeEach(() => {
      mockProps = {
        client: {},
        clientsProblem: {
          categories: ['categories'], 
          title: 'title', 
          body: 'body'
        }
      };
      wrapper = shallow(<ClientProfile {...mockProps} />);
    });
    
    it('should return categories if they exist', () => {
      

      expect(wrapper.find('button').length).toEqual(2);
    });
  });

  describe('logInCheck', () => {
    let wrapper;
    let mockProps;

    beforeEach(() => {
      mockProps = {
        client: {}
      };
      wrapper = shallow(<ClientProfile {...mockProps} />);
    });
    
    it('should redirect if there is no client', () => {
      
      const actual = wrapper.instance().logInCheck(mockProps.client);
      expect(actual).toEqual(<Redirect to='/client-login'/>);
    });
  });

  describe('mapStateToProps', () => {
    it('returns an object with client info', () => {

      const mockState = {
        client: {name: 'Tony'},
        clientsProblem: {problem: 'Problem'},
        repoStats: {stats: 'stats'}
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
      
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch on signInClientwith the correct params', () => {

      const mockDispatch = jest.fn();
      const user = {name: 'Tony'};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'SIGN_IN_CLIENT',
        user
      };
      
      mappedProps.signInClient(user);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });

    it('should call dispatch on addRepoStats with the correct params', () => {

      const mockDispatch = jest.fn();
      const stats = {stats: 'stats'};
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_REPO_STATS',
        stats
      };
      
      mappedProps.addRepoStats(stats);
      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
      
    });
  });
});