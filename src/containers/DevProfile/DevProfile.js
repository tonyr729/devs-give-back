import React, { Component } from 'react';
import './DevProfile.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { addProjects } from '../../actions/actions';



class DevProfile extends Component {

  displayProjects = (projects) => {
    if (projects) {
      const display = projects.map((project, index) => {
        const categories = project.categories.map((category, index) => (
          <button key={index} className="category-display">{category}</button>
        ));
        return (
          <div key={index} className="project-card">
            <p className="dev-project-title">{project.title}</p>
            <div className="dev-category-container">
              {categories}
            </div>
          </div>
        );
      });
      return display;
    }
  }

  statusCheck = (dev) => {
    const users = Object.keys(dev).length;
    if ( users === 0 ) {
      return <Redirect to='/dev-login'/>;
    }
    if (!this.props.projects) {
      return <Redirect to='/dev-project-list' />;
    }
  }

  render() {
    const redirect = this.statusCheck(this.props.dev);
    const currentProjects = this.displayProjects(this.props.projects);
    return (
      <div className="profile-background">
        {redirect}
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
            <div className="current-projects">
              {currentProjects}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dev: state.dev,
  projects: state.projects
});


export default connect(mapStateToProps)(DevProfile);