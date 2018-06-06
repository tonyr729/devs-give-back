import React from 'react';
import './DevClosedProjects.css';
import { NavLink } from 'react-router-dom';

export const DevClosedProjects = () => {
  return (
    <div className="under-construction">
      <h1 className="warning">UNDER CONSTRUCTION!</h1>
      <p className="blah">
        Yayyy thanks for clicking that link but... 
        this isn't done yet. Probably because I'm 
        sitting here making this message when I could be coding it... 
        but whatever!
      </p>
      <NavLink to='/'>
        Uhh... take me back to the start?
      </NavLink>
    </div>
  );
};