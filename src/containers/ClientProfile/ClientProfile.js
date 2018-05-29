import React, { Component } from 'react';
import './ClientProfile.css';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase';
import { findMatchingProblem } from '../../helpers/apiCalls';


class ProblemBody extends Component {


  componentDidMount = () => {
    const problem = findMatchingProblem(this.props.user.id);
    
  }

  render() {
    let name;
    !this.props.user.name ? this.props.history.push("/client-login") : name = this.props.user.name.split(' ')[0];

    return (
      <div className="frame-container">
        <div className="header">
          <div className="header-container">
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



export default connect(mapStateToProps)(ProblemBody);