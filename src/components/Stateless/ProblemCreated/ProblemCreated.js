import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProblemCreated.css';

export const ProblemCreated = () => {
  return (
    <div className='problem-created'>
      <p className='thanks-text'>Thank you!</p>
      <p className='info-message'>Your problem has been created.</p>
      <NavLink to='/new-profile'>
        <button className="goto-profile-button">GO TO PROFILE</button>
      </NavLink>
    </div>
  );
};