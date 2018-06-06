import React from 'react';
import { NavLink } from 'react-router-dom';
import './SplitLogin.css';

export const SplitLogin =() => {
  return (
    <div>
      <div className='client-login'>
        <NavLink to='/client-login'>
          <p>Problem Owner</p>
        </NavLink>
      </div>
      <div className='dev-login'>
        <NavLink to='/dev-login'>
          <p>Developer</p>
        </NavLink>
      </div>
    </div>
  );
};
