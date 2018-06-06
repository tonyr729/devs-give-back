import { ProblemCategory} from './ProblemCategory';
import React from 'react';
import { shallow } from 'enzyme';
jest.mock('../../helpers/DatabaseHelper.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      pullCategoriesFromDatabase: jest.fn().mockImplementation(() => Promise.resolve({category: 'category'})),
      writeProblemToDatabase: jest.fn().mockImplementation(() => Promise.resolve({problem: 'problem'}))
    };
  });
});


describe('ProblemCategory', () => {
  it('should match snapshot', () => {
    const mockProps = {
      client: {name: 'tony'},
      addCategories: jest.fn()
    };
    const wrapper = shallow(<ProblemCategory {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        addCategories: jest.fn()
      };
      wrapper = shallow(<ProblemCategory {...mockProps} />);
    });

    it('should call given functions on mount of component', () => {
      expect(wrapper.instance().database.pullCategoriesFromDatabase).toHaveBeenCalled();
      expect(wrapper.instance().props.addCategories).toHaveBeenCalled();
    });
  });

  describe('displayCategories', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        addCategories: jest.fn(),
        categories: ['categoryx', 'categoryx', 'categoryx']
      };
      wrapper = shallow(<ProblemCategory {...mockProps} />);
    });

    it('should render categories if they exist', () => {
      expect(wrapper.find("CategoryButton").length).toEqual(3);
    });
  });

  describe('selectCategories', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        addCategories: jest.fn(),
        categories: ['categoryx', 'categoryx', 'categoryx']
      };
      wrapper = shallow(<ProblemCategory {...mockProps} />);
    });

    it('should add a category to state', () => {
      const expected = 'cat';
      wrapper.instance().selectCategory(expected);
      expect(wrapper.state('categories')).toEqual([expected]);
    });

    it('remove a category from state if it already exists in state', () => {
      const expected = ['cat'];
      wrapper.setState({
        categories: expected
      });

      wrapper.instance().selectCategory(expected[0]);

      expect(wrapper.state('categories')).toEqual([]);
    });
  });

  describe('handleSubmit', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {name: 'tony'},
        addCategories: jest.fn(),
        categories: ['categoryx', 'categoryx', 'categoryx'],
        title: 'title',
        body: 'body',
        clientID: 1,
        selectCategories: jest.fn(),
        history: {
          push: jest.fn()
        }
      };
      wrapper = shallow(<ProblemCategory {...mockProps} />);
    });

    it('should call the given functions ', () => {
      wrapper.instance().handleSubmit();

      expect(wrapper.instance().props.selectCategories).toHaveBeenCalled();
      expect(wrapper.instance().database.writeProblemToDatabase).toHaveBeenCalled();
      expect(wrapper.instance().props.history.push).toHaveBeenCalled();
    });
  });

  describe('logInCheck', () => {
    let mockProps;
    let wrapper;

    beforeEach(() => {
      mockProps = {
        client: {},
        addCategories: jest.fn(),
        categories: ['categoryx', 'categoryx', 'categoryx'],
        history: {
          push: jest.fn()
        }
      };
      wrapper = shallow(<ProblemCategory {...mockProps} />);
    });
    
    it('should redirect if no user', () => {
      wrapper.instance().logInCheck(mockProps.client);
      
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith("/client-login");
    });
  });

});