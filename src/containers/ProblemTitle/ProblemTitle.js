import React, { Component } from 'react';
import './ProblemTitle.css';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import {createProblemTitle, createProblemClient } from '../../actions/actions';
import DatabaseHelper from '../../helpers/DatabaseHelper';
import rightArrow from '../../images/right_arrow.svg';

class ProblemTitle extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }

    this.database = new DatabaseHelper();
  }

  componentDidMount(){
    this.problemCheck(this.props.client)
    this.logInCheck(this.props.client);
  }

  problemCheck = async (client) =>{
    client.name || this.props.history.push("/client-login")
    const existingProblem = await this.database.findMatchingProblem(client.id);
    !existingProblem || this.props.history.push("/prior-problem");
  }

  handleInputChange= (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createProblemTitle(this.state.input);
    this.props.createProblemClient(this.props.client.id);
    this.props.history.push("/problem-body")
  }

  logInCheck = (client) => {
    const value = Object.keys(client).length;
    if ( value === 0 ) {
      this.props.history.push('/client-login')
    }
  }


  render() {
    const name = this.props.client.name || 'client unknown';
    const firstName = name.split(' ')[0];
    return (
      <div className='client-background'>
        <p className='welcome'>Hi {firstName},</p>
        <p className='title-instructions'>Briefly describe your problem...</p>
        <p className='example'>Ex: Looking for a solution to help an afterschool program</p> 
        <input className='title-input' placeholder='Looking for ...' maxLength='70' value={this.state.input} onChange={this.handleInputChange}/>
        <button className='title-next-button' onClick={this.handleSubmit} ><img className='right-arrow-img' src={rightArrow} /></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  client: state.client
});

const mapDispatchToProps = (dispatch) => ({
  createProblemClient: (client) => dispatch(createProblemClient(client)),
  createProblemTitle: (title) => dispatch(createProblemTitle(title))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProblemTitle);