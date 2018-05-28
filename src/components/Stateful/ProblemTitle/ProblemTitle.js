import React, { Component } from 'react';
import './ProblemTitle.css';
import { NavLink } from 'react-router-dom'
import rightArrow from '../../../images/right_arrow.svg'

class ProblemTitle extends Component {
  constructor() {
    super();
    this.state = {
      input: 
    }
  }

  handleInputChange = (event) => {
    
  }
  render() {
    return (
      <div>
        <p className='title-instructions'>Briefly describe your problem...</p>
        <p>Ex: Looking for a solution to help an afterschool program</p> 
        <input className='title-input' placeholder='Looking for ...' maxLength='70' value={this.state.input} onChange={this.handleInputChange}/>
        <NavLink to='/problem-body'>
          <img src={rightArrow} />
        </NavLink>
      </div>
    );
  }
}