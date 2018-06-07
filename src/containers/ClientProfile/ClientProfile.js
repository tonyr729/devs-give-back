import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import DataCleaner from '../../helpers/DataCleaner';
import APIHelper from '../../helpers/APIHelper';
import { addRepoStats, signInClient } from '../../actions/actions';
import handsPhoto from '../../images/hands.svg';
import linesPhoto from '../../images/code.svg';
import updatesPhoto from '../../images/update.svg';
import hourPhoto from '../../images/time.svg';

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
      console.log(repoURL);
      const apiURL = this.cleaner.cleanRepoURL(repoURL);
      try {
        const lines = await this.api.fetchLinesOfCode(apiURL);
        const contributers = await this.api.fetchNumberOfContributers(apiURL);
        const updates = await this.api.fetchNumberOfUpdates(apiURL);
        const hours = await this.api.fetchNumberOfHours(apiURL);
        stats = { lines, contributers, updates, hours };
      } catch (error) {
        console.log(error)
        this.props.history.push('/error-page');
      }
    }
    return stats;
  }

  displayStats = (stats) => {
    if (stats){
      const contributer = stats.contributer > 1 ? 'contributer' : 'contributers';
      return (
        <div className="stats-container">
          <div className="stats-card">
            <img src={handsPhoto} alt="illustration of hands" className="contributer-image"/>
            <p className="stats-title">{stats.contributers} {contributer}!</p>
          </div>
          <div className="stats-card">
            <img src={linesPhoto} alt="illustration of lines of code" className="lines-image"/>
            <p className="stats-title">{stats.lines} lines of code</p>
          </div>
          <div className="stats-card">
            <img src={updatesPhoto} alt="illustration of updates" className="updates-image"/>
            <p className="stats-title">{stats.updates} updates!</p>
          </div>
          <div className="stats-card">
            <img src={hourPhoto} alt="illustration of a hourglass" className="hour-image"/>
            <p className="stats-title">Roughly {stats.hours} hours spent</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="stats-container">
          <p className="stats-title">Nothing at this time</p>
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
        <div className="problem">
          <p className="section-title">Heres your problem</p>
          <div className="problem-container">
            <p className="problem-title">{clientsProblem.title}</p>
            <p className="problem-body">{clientsProblem.body}</p>
            <div className="category-tags">
              {categories}
            </div>
          </div>
        </div>
        <div className="stats">
          <div className="stats-section">
            <p className="stats-section-title">Heres whats happening</p>
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