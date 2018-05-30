import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { findMatchingProblem } from '../../helpers/apiCalls';
import { connect } from 'react-redux';
import {createProblemTitle, createProblemBody, createProblemClient } from '../../actions/actions';
import './PriorProblem.css'

class PriorProblem extends Component {
  constructor() {
    super();
    this.state = {
      problem: {}
    }
  }

  componentDidMount = async () => {
    const problem = await findMatchingProblem(this.props.user.id);
    console.log(problem)
    this.setState({
      problem: problem
    })
  }
  
  handleClick = () => {
    if (this.state.problem){
      this.props.createProblemClient(this.state.problem.clientID)
      this.props.createProblemTitle(this.state.problem.title)
      this.props.createProblemBody(this.state.problem.body)
      this.props.history.push("/client-profile");
    } else {
      this.props.history.push("/client-login")
    }
  }

  render() {
    return (
      <div>
        <p className='sorry-text'>Sorry,</p>
        <p className='info-message'>You can only have one listed problem at a time.</p>
          <button className='nav-button' onClick={ this.handleClick }>Go to my profile</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user 
});

const mapDispatchToProps = (dispatch) => ({
  createProblemClient: (client) => dispatch(createProblemClient(client)),
  createProblemTitle: (title) => dispatch(createProblemTitle(title)),
  createProblemBody: (body) => dispatch(createProblemBody(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(PriorProblem);