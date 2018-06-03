import React, { Component } from 'react';
import './DevProfile.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';



class DevProfile extends Component {
  
  logInCheck = (dev) => {
    const value = Object.keys(dev).length;
    if ( value === 0 ) {
      return <Redirect to='/dev-login'/>;
    }
    if (!dev.projects) {
      return <Redirect to='/dev-project-list' />;
    }
  }

  render() {
    const redirect = this.logInCheck(this.props.dev);
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
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dev: state.dev
});

export default connect(mapStateToProps)(DevProfile);