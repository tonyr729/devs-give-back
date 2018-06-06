import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DatabaseHelper from '../../helpers/DatabaseHelper';
import DataCleaner from '../../helpers/DataCleaner';
import APIHelper from '../../helpers/APIHelper';

import './NewProfile.css';

export class NewProfile extends Component {
  
  displayCategories = (categories) => {
    let display = null;
    if (categories) {
      display = categories.map(category => {
        return (
          <button className="display-category">{category}</button>
        );
      });
    }
    return display;
  }
  
  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      return <Redirect to='/client-login'/>
    }
  }
  
  render() {
    console.log(this.props.problem.categories)
    const redirect = this.logInCheck(this.props.client);
    const categories = this.displayCategories(this.props.problem.categories);
    return (
      <div className="frame-container">
        {redirect}
        <div className="header">
          <div className="header-container">
            <p>{this.props.client.name}</p>
            <img className='profile-picture' src={this.props.client.photoURL} alt="user profile picture"/>
          </div>
        </div>
        <div className="problem">
          <div className="problem-container">
            <p className="section-title">Heres your problem</p>
            <p className="problem-title">{this.props.problem.title}</p>
            <p className="problem-body">{this.props.problem.body}</p>
            <div className="category-tags">
              {categories}
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stats-container">
            <p className="section-title">Heres whats happening</p>
            <p className="stats-title">Nothing at this time :(</p>
          </div>
        </div>
      </div>
      
    );
  }
}

export const mapStateToProps = (state) => ({
  client: state.client,
  problem: state.problem
});


export default connect(mapStateToProps)(NewProfile);