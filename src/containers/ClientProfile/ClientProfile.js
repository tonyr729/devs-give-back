import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './ClientProfile.css';

export class ClientProfile extends Component {

  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      return <Redirect to='/client-login'/>
    }
  }

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

  render() {
    const redirect = this.logInCheck(this.props.client);
    const categories = this.displayCategories(this.props.categories);
    
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
            <p className="problem-title">{this.props.title}</p>
            <p className="problem-body">{this.props.body}</p>
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

const mapStateToProps = (state) => ({
  client: state.client,
  title: state.problem.title,
  body: state.problem.body,
  categories: state.problem.categories
});


export default connect(mapStateToProps)(ClientProfile);