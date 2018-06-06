import React, { Component } from 'react';
import './DevProfile.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { addProjects, signInDev } from '../../actions/actions';
import DatabaseHelper from '../../helpers/DatabaseHelper';



export class DevProfile extends Component {
  constructor() {
    super();
    this.database = new DatabaseHelper();
  }

  async componentDidMount() {
    const projects = await this.database.pullProjectsFromDatabase(this.props.dev.id);
    if (projects) {
      await this.props.addProjects(projects);
    }
  }

  displayProjects = (projects) => {
    const goodProjects = projects && projects.filter(problems => problems !== undefined);
    if (goodProjects && goodProjects.length !== 0) {
      const display = goodProjects.map((project, index) => {
        return (
          <div key={index} className="project-card">
            <p className="dev-project-title">{project.title}</p>
            <button className="project-button">Project Page</button>
            <button className="client-button">Client</button>
            <button className="contributors-button">Contributors</button>
            <button className="resign-button">Resign</button>
          </div>
        );
      });
      return display;
    } else {
      return (
        <div className="info-text">
          <p>You currently have no open projects.</p>
          <p>Click "New Project" to see avalible projects.</p>
        </div>
      );
    }
  }

  statusCheck = (dev) => {
    const users = Object.keys(dev).length;
    if ( users === 0 ) {
      return <Redirect to='/dev-login'/>;
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
            <button onClick={() => this.props.signInDev('')} className="signout-button">Sign Out</button>
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
    );
  }
}

export const mapStateToProps = (state) => ({
  dev: state.dev,
  projects: state.projects
});

export const mapDispatchToProps = (dispatch) => ({
  addProjects: (projects) => dispatch(addProjects(projects)),
  signInDev: (user) => dispatch(signInDev(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(DevProfile);