import React, { Component } from 'react';
import './ClientProfile.css';
import { connect } from 'react-redux';
import firebase from '../../firebase/firebase'


class ProblemBody extends Component {


  findMatchingProblem = async (userID) => {
    const response = await firebase.database().ref('/Problems/').once('value');
    const problems = response.val();
    const matchingID = Object.keys(problems).find(problem => problems[problem].clientID === userID)
    console.log(problems[matchingID])
    return problems[matchingID]
  }

  render() {
    let name;
    !this.props.user.name ? this.props.history.push("/client-login") : name = this.props.user.name.split(' ')[0];

    return (
      <div className="frame-container">
        <div className="header">
          <div className="header-container">
            <button onClick={()=> this.findMatchingProblem(this.props.user.id)}></button>
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