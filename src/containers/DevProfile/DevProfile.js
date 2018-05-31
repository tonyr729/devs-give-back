import React, { Component } from 'react';
import './DevProfile.css';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase';
import { findMatchingProblem } from '../../helpers/apiCalls';


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
      this.props.history.push('/dev-login')
    }
  }

  render() {
    this.logInCheck(this.props.dev)
    return (
      <div>
        <p>This is the DevProfile</p>
        <button onClick={this.runFetch}>Run Fetch</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dev: state.dev
});


export default connect(mapStateToProps)(ClientProfile);