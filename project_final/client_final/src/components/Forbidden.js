import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const Forbidden = () => {
  return(
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh no! You aren't authorized to access this page.</p>
      <p>If you would like to go further <NavLink to="/signin">sign in</NavLink></p>
    </div>  
  );
}

export default Forbidden;