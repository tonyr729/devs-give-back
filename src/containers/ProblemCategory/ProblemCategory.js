import React, { Component } from 'react';
import './ProblemCategory.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import { createProblemCategories } from '../../actions/actions';
import rightArrow from '../../images/right_arrow.svg';
import leftArrow from '../../images/left_arrow.svg';


class ProblemCategory extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    }
    this.database = new DatabaseHelper();
  }

  handleSelectCategory= (event) => {
    const category = event.target.innerText;
    this.setState({
      categories: [...this.state.categories, category]
    })
  }

  handleSubmit = (event) => {
    const {title, body, clientID} = this.props;
    this.props.createProblemCategories(this.state.categories)
    this.database.writeProblemToDatabase(title, body, this.state.categories, clientID);
    this.props.history.push("/problem-created")
  }

  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      this.props.history.push("/client-login");
    }
  }
  

  render() {
    this.logInCheck(this.props.client)
    const name = this.props.client.name || 'client unknown';
    const firstName = name.split(' ')[0];

    return (
      <div className='client-background'>
        <p className='welcome'>One last step {firstName},</p>
        <p className='body-instructions'>Please select categories that match your problem.</p>
        <div className="categories">
          <button onClick={this.handleSelectCategory} className="category-button">Education</button>
        </div>
        <div className="button-container">
          <button className='previous-button' onClick={()=> this.props.history.push("/problem-title")} ><img className='left-arrow-img' src={leftArrow} /></button>
          <button className='next-button' onClick={this.handleSubmit} ><img className='right-arrow-img' src={rightArrow} /></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client,
  clientID: state.problem.client,
  title: state.problem.title,
  body: state.problem.body
});

const mapDispatchToProps = dispatch => ({
  createProblemCategories: categories => dispatch(createProblemCategories(categories))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProblemCategory);