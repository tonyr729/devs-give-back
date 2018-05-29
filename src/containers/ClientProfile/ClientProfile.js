import React, { Component } from 'react';
import './ClientProfile.css';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase';
import { findMatchingProblem } from '../../helpers/apiCalls';


class ClientProfile extends Component {


  render() {
    let name;
    !this.props.user.name ? this.props.history.push("/client-login") : name = this.props.user.name.split(' ')[0];

    return (
      <div className="frame-container">
        <div className="header">
          <div className="header-container">
            <img src={this.props.user.photoURL} alt="user profile picture"/>
          </div>
        </div>
        <div className="problem">
          <div className="problem-container">

          </div>
        </div>
        <div className="stats">
          <div className="stats-container">

          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user 
});


export default connect(mapStateToProps)(ClientProfile);