import React from 'react';
import { NavLink } from 'react-router-dom';
import './Splash.css';

export const Splash =() => {
  return (
    <div className='splash'>
      <h1>devs<span>GIVE</span>back</h1>
      <h3>MISSION</h3>
      <p>Passionate and talented developers exist all around the world.
         Many of these developers are looking to volunteer their skill 
         and passion to help those in need. This site aims to provide a 
         meeting place for individuals who have a problem and developers 
         that can offer solutions. All work should remain voluntary. Developers
         on this site are not seeking payment. Their main focus is to give back 
         to the community. That being said some projects may require the use of 
         outside services that may come with a cost. (storage, hosting, etc...)
         Ideal problems are ones that are civic-minded, or that can positively 
         affect a wide range of individuals when solved. It is up to the 
         discretion of the developer to take on a problem. 
      </p>
      <NavLink to='/choice'><button className='begin-button'>BEGIN</button></NavLink>
      <NavLink className='split-link' to='/split-login'>I already have an account</NavLink>
    </div>
  );
};
