import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logoIcon from '../../images/dgb_logo-01.svg';
import noUserIcon from '../../images/no-user.svg';
import './NavBar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
  }

  getUserInfo = () => {
    let photo;
    let signedIn;
    if (this.props.client && this.props.client.photoURL){
      photo = this.props.client.photoURL;
      signedIn = 'Sign Out';
    } else if (this.props.dev && this.props.dev.photoURL) {
      photo = this.props.dev.photoURL;
      signedIn = 'Sign Out';
    } else {
      photo = noUserIcon;
      signedIn = 'Sign In';
    }
    return {signedIn, photo}
  }

  render() {
    const userInfo = this.getUserInfo();
    return (
      <div className="fixed-nav">
        <div className="logo-container">
          <NavLink to='/' exact activeClassName="navlink-active">
            <img src={logoIcon} alt="logo for devs give back"/>
          </NavLink>
          <p className='site-title'>DEVS<span className='site-title-span'>GIVE</span>BACK</p>
        </div>
        <div className="navlink-container">
          <NavLink to='/' exact activeClassName="navlink-active">
            HOME
          </NavLink>
          <NavLink to='/client-login' exact activeClassName="navlink-active">
            CLIENTS
          </NavLink>
          <NavLink to='/dev-login' exact activeClassName="navlink-active">
            DEVELOPERS
          </NavLink>
          <div className="user-container">
            <NavLink to='/split-login' exact activeClassName="active">
              <button className='profile-button'>{userInfo.signedIn}</button>
            </NavLink>
            <img src={userInfo.photo} alt="icon for user login"/>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  client: state.client,
  dev: state.dev
});

export default connect(mapStateToProps)(NavBar);