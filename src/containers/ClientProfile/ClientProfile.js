import React, { Component } from 'react';
import './ClientProfile.css';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase';
import { findMatchingProblem } from '../../helpers/apiCalls';


class ClientProfile extends Component {


  render() {
    let name;
    !this.props.client.name ? this.props.history.push("/client-login") : name = this.props.client.name.split(' ')[0];
    return (
      <div className="frame-container">
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
  title: state.problemTitle,
  body: state.problemBody
});


export default connect(mapStateToProps)(ClientProfile);