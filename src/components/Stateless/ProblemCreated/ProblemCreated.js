import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProblemCreated.css'

export const ProblemCreated = () => {
  return (
    <div>
      <p className='thanks-text'>Thank you!</p>
      <p className='info-message'>Your problem has been created.</p>
      <NavLink to='/client-profile'>
        <p>Go to my profile</p>
      </NavLink>
    </div>
  );
};