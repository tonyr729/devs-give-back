import React from 'react';
import { NavLink } from 'react-router-dom';
import './PriorProblem.css'

export const PriorProblem = () => {
  return (
    <div>
      <p className='sorry-text'>Sorry,</p>
      <p className='info-message'>You can only have one listed problem at a time.</p>
      <NavLink to='/client-profile'>
        <p>Go to my profile</p>
      </NavLink>
    </div>
  );
};