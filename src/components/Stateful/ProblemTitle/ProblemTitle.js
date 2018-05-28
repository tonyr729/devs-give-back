import React, { Component } from 'react';
import './ProblemTitle.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import {createProblemTitle, createProblemClient } from '../../../actions/actions';
import rightArrow from '../../../images/right_arrow.svg'

class ProblemTitle extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  handleInputChange= (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createProblemTitle(this.state.input);
    this.props.createProblemClient(this.props.user.id);
    this.props.history.push("/problem-body")
  }

  render() {
    let name;
    !this.props.user.name ? this.props.history.push("/client-login") : name = this.props.user.name.split(' ')[0];

    return (
      <div>
        <p className='welcome'>Hi {name},</p>
        <p className='title-instructions'>Briefly describe your problem...</p>
        <p className='example'>Ex: Looking for a solution to help an afterschool program</p> 
        <input className='title-input' placeholder='Looking for ...' maxLength='70' value={this.state.input} onChange={this.handleInputChange}/>
        <button className='next-button' onClick={this.handleSubmit} ><img className='right-arrow-img' src={rightArrow} /></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  createProblemClient: (user) => dispatch(createProblemClient(user)),
  createProblemTitle: (title) => dispatch(createProblemTitle(title))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProblemTitle);