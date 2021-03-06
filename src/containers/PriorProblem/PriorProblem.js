import React, { Component } from 'react';
import DatabaseHelper from '../../helpers/DatabaseHelper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCompletedProblem } from '../../actions/actions';

import './PriorProblem.css';

export class PriorProblem extends Component {
  constructor() {
    super();
    this.database = new DatabaseHelper();
  }

  componentDidMount = async () => {
    if (this.props.client) {
      const clientID = this.props.client.id; 
      const problem = await this.database.findMatchingProblem(clientID);
      if (problem) {
        await this.props.createCompletedProblem(problem);
      }
    }
  }
  
  handleClick = () => {
    const value = Object.keys(this.props.clientsProblem);
    if (value.length === 0){
      this.props.history.push("/client-login");
    } else {
      this.props.history.push("/client-profile");
    }
  }

  render() {
    return (
      <div className='client-background'>
        <p className='sorry-text'>Sorry,</p>
        <p className='info-message'>You can only have one listed problem at a time.</p>
        <button className='nav-button' onClick={ this.handleClick }>Go to my profile</button>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  client: state.client,
  clientsProblem: state.clientsProblem
});

export const mapDispatchToProps = (dispatch) => ({
  createCompletedProblem: (problem) => dispatch(createCompletedProblem(problem))
});

PriorProblem.propTypes = {
  clientsProblem: PropTypes.object,
  history: PropTypes.object,
  push: PropTypes.func,
  client: PropTypes.object,
  createCompletedProblem: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PriorProblem);