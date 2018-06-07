import React, { Component } from 'react';
import './ProblemCategory.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import { addCategories, selectCategories } from '../../actions/actions';
import CategoryButton from '../../components/Statefull/CategoryButton/CategoryButton';
import rightArrow from '../../images/right_arrow.svg';
import leftArrow from '../../images/left_arrow.svg';


export class ProblemCategory extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
    this.database = new DatabaseHelper();
  }


  async componentDidMount() {
    const categories = await this.database.pullCategoriesFromDatabase();
    this.props.addCategories(categories);
  }

  componentWillReceiveProps() {}

  displayCategories = () => {
    let display = null;
    if (this.props.categories) {
      display = this.props.categories.map((category, index) => ( 
        <CategoryButton key={index} selectCategory={this.selectCategory} category={category} />
      ));
    }
    return display;
  }

  selectCategory= (category) => {
    let match = this.state.categories.includes(category);
    if (!match) {
      this.setState({
        categories: [...this.state.categories, category]
      });
    } else {
      let newState = this.state.categories.filter(currCategory => currCategory !== category);
      this.setState({
        categories: newState
      });
    }
  }

  handleSubmit = () => {
    const {title, body, clientID} = this.props;
    this.props.selectCategories(this.state.categories);
    this.database.writeProblemToDatabase(title, body, this.state.categories, clientID);
    this.props.history.push("/problem-created");
  }

  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      this.props.history.push("/client-login");
    }
  }
  

  render() {
    this.logInCheck(this.props.client);
    const categories = this.displayCategories();
    const name = this.props.client.name || 'client unknown';
    const firstName = name.split(' ')[0];
    return (
      <div className='client-background'>
        <p className='welcome'>One last step {firstName},</p>
        <p className='categories-instructions'>Please select categories that match your problem.</p>
        <div className="categories">
          {categories}
        </div>
        <div className="button-container">
          <button className='previous-button' onClick={()=> this.props.history.push("/problem-body")} >
            PREV
          </button>
          <button className='next-button' onClick={this.handleSubmit} >
            NEXT
          </button>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  client: state.client,
  clientID: state.problem.client,
  title: state.problem.title,
  body: state.problem.body,
  categories: state.categories
});

export const mapDispatchToProps = dispatch => ({
  addCategories: categories => dispatch(addCategories(categories)),
  selectCategories: categories => dispatch(selectCategories(categories))
});

ProblemCategory.propTypes = {
  addCategories: PropTypes.func,
  categories: PropTypes.array,
  client: PropTypes.object,
  selectCategories: PropTypes.func,
  history: PropTypes.object,
  title: PropTypes.string,
  body: PropTypes.string,
  clientID: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemCategory);