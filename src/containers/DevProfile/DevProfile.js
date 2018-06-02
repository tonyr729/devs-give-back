import React, { Component } from 'react';
import './DevProfile.css';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';


class ClientProfile extends Component {

  runFetch = async () => {
    const url = `https://api.github.com/repos/tonyr729/movie-tracker/stats/contributors?access_token=${this.props.dev.token}`;
    const response = await fetch(url);
    const data = response.json();
    console.log(data)
  }

  logInCheck = (dev) => {
    const value = Object.keys(dev).length;
    if ( value === 0 ) {
      return <Redirect to='/dev-login'/>
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


export default connect(mapStateToProps)(ClientProfile);