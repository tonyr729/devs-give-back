import React from 'react';
import { NavLink } from 'react-router-dom';
import './ErrorPage.css';

export const ErrorPage = () => {
  return (
    <div>
      <p className='sorry-text'>Awkward</p>
      <p className='message'>Something went wrong on our end. <br /> Sorry about that...</p>
      <NavLink to='/'>
        <p>Go back</p>
      </NavLink>
    </div>
  );
};