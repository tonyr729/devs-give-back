import React, { Component } from 'react';
import './DevProjectList.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import DatabaseHelper from '../../helpers/DatabaseHelper';
import { addAllProblems, addProjects, handleSignup } from '../../actions/actions';
import SignUp from '../SignUp/SignUp';
import SignupButton from '../../components/Statefull/SignupButton/SignupButton';



export class DevProjectList extends Component {
  constructor() {
    super();
    this.database = new DatabaseHelper();
  }

  async componentDidMount() {
    const projects = await this.database.pullProjectsFromDatabase(this.props.dev.id);
    const problems = await this.database.pullProblemsFromDatabase();
    const problemsList = Object.values(problems);
    this.props.addAllProblems(problemsList);
    if (projects) {
      this.props.addProjects(projects);
    }
  }

  componentDidUpdate() {}


  displayAllProblems = (problems) => {
    let display = null;
    let matchingDev = false;
    if (problems) {
      display = problems.map((problem, index) => {
        const categories = problem.categories.map((category, index) => (
          <button key={index} className="category-display">{category}</button>
        ));
        if (problem.dev) {
          matchingDev = problem.dev.devID === this.props.dev.id;
        }

        return (
          <div key={index} className="problem-card">
            <p className="dev-problem-title">{problem.title}</p>
            <p className="dev-problem-body">{problem.body}</p>
            <SignupButton 
              handleSignup={ this.props.handleSignup } 
              clientID={ problem.clientID } 
              matchingDev={ matchingDev } 
            />
            <div className="dev-category-container">
              {categories}
            </div>
          </div>
        );
      });
    }
    return display;
  }

  logInCheck = (dev) => {
    const value = Object.keys(dev).length;
    if ( value === 0 ) {
      return <Redirect to='/dev-login'/>;
    }
  }

  render() {
    const redirect = this.logInCheck(this.props.dev);
    const problems = this.displayAllProblems(this.props.allProblems);
    return (
      <div className="profile-background">
        {redirect}
        { !this.props.signup.status || <SignUp history={this.props.history}/>}
        <div className="dev-header">
          <div className="dev-header-container">
            <p>{this.props.dev.name}</p>
            <img className='profile-picture' src={this.props.dev.photoURL} alt="developer profile picture"/>
          </div>
        </div>
        <div className="main">
          <div className="main-container">
            <p className="main-section-titles">
              <NavLink to='/dev-project-list'>
                New Project
              </NavLink> | &nbsp;
              <NavLink to='/dev-profile'>
                Open Projects
              </NavLink> | &nbsp;
              <NavLink to='/dev-closed-projects'>
                Closed Projects 
              </NavLink>
            </p>
            <p className="main-section-choice">Choose from a problem below</p>
            <div className="main-section">
              {problems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  dev: state.dev,
  allProblems: state.allProblems,
  signup: state.signup
});

export const mapDispatchToProps = (dispatch) => ({
  addAllProblems: (problems) => dispatch(addAllProblems(problems)),
  addProjects: (projects) => dispatch(addProjects(projects)),
  handleSignup: (status, problemID) => dispatch(handleSignup(status, problemID))
});

DevProjectList.propTypes = {
  dev: PropTypes.object,
  addAllProblems: PropTypes.func,
  addProjects: PropTypes.func,
  handleSignup: PropTypes.func,
  allProblems: PropTypes.array,
  signup: PropTypes.object,
  history: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(DevProjectList);