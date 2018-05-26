import React from 'react';
import { NavLink } from 'react-router-dom';
import './Choice.css';

export const Choice = () => {
  return(
    <div>
      <div className='user-choice'>
        <NavLink to='/client-login'>
          <p>I have a problem.</p>
        </NavLink>
      </div>
      <div className='dev-login'>
        <NavLink to='/dev-login'>
          <p>I have a solution.</p>
        </NavLink>
      </div>
    </div>
  )
}