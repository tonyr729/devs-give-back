import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import DataCleaner from '../../helpers/DataCleaner';
import APIHelper from '../../helpers/APIHelper';
import { addRepoStats, signInClient } from '../../actions/actions';

import './ClientProfile.css';

export class ClientProfile extends Component {
  constructor() {
    super();
    this.state = {
      problem: ''
    };
    this.database = new DatabaseHelper();
    this.cleaner = new DataCleaner();
    this.api = new APIHelper();
  }
  
  async componentDidMount() {
    const stats = await this.getRepoStats(this.props.clientsProblem);
    if (stats){
      await this.props.addRepoStats(stats);
    }
  }
  
  getRepoStats = async (problem) => {
    let stats = null;
    if (problem && problem.dev) {

      const repoDev = Object.values(problem.dev).find(dev => dev.repo);
      const repoURL = repoDev.repo;
      const apiURL = this.cleaner.cleanRepoURL(repoURL);
      try {
        const lines = await this.api.fetchLinesOfCode(apiURL);
        const contributers = await this.api.fetchNumberOfContributers(apiURL);
        const updates = await this.api.fetchNumberOfUpdates(apiURL);
        const hours = await this.api.fetchNumberOfHours(apiURL);
        stats = { lines, contributers, updates, hours };
      } catch (error) {
        this.props.history.push('/error-page');
        throw new Error('Failed to fetch data');
      }
    }
    return stats;
  }

  displayStats = (stats) => {
    if (stats){
      const contributer = stats.contributer > 1 ? 'contributers' : 'contributer';
      return (
        <div className="stats-container">
          <p className="stats-title">{stats.contributers} {contributer}!</p>
          <p className="stats-title">{stats.lines} lines of code created!</p>
          <p className="stats-title">{stats.updates} updates!</p>
          <p className="stats-title">Roughly {stats.hours} hours spent on your project!</p>
        </div>
      );
    } else {
      return (
        <div className="stats-container">
          <p className="stats-title">Nothing at this time :(</p>
        </div>

      ); 
    }
  }

  
  displayCategories = (categories) => {
    let display = null;
    if (categories) {
      display = categories.map((category, index)=> {
        return (
          <button key={index} className="display-category">{category}</button>
        );
      });
    }
    return display;
  }
  
  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      return <Redirect to='/client-login'/>;
    }
  }
  
  render() {
    const redirect = this.logInCheck(this.props.client);
    let clientsProblem = {title: '', body: ''};
    let categories = '';
    if (this.props.clientsProblem) {
      clientsProblem = this.props.clientsProblem;
      categories = this.displayCategories(this.props.clientsProblem.categories);
    }
    const displayStats = this.displayStats(this.props.repoStats);
    

    return (
      <div className="frame-container">
        {redirect}
        <div className="header">
          <div className="header-container">
            <p>{this.props.client.name}</p>
            <img className='profile-picture' src={this.props.client.photoURL} alt="user profile picture"/>
            <button onClick={() => this.props.signInClient('')} className="signout-button">Sign Out</button>
          </div>
        </div>
        <div className="problem">
          <div className="problem-container">
            <p className="section-title">Heres your problem</p>
            <p className="problem-title">{clientsProblem.title}</p>
            <p className="problem-body">{clientsProblem.body}</p>
            <div className="category-tags">
              {categories}
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stats-section">
            <p className="section-title">Heres whats happening</p>
            {displayStats}
          </div>
        </div>
      </div>
      
    );
  }
}

export const mapStateToProps = (state) => ({
  client: state.client,
  clientsProblem: state.clientsProblem,
  repoStats: state.repoStats
});

export const mapDispatchToProps = (dispatch) => ({
  signInClient: (client) => dispatch(signInClient(client)),
  addRepoStats: (stats) => dispatch(addRepoStats(stats))
});

ClientProfile.propTypes = {
  clientsProblem: PropTypes.object,
  client: PropTypes.object,
  repoStats: PropTypes.bool,
  addRepoStats: PropTypes.func,
  signInClient: PropTypes.func,
  history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile);