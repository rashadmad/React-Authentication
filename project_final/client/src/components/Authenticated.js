import React from 'react';
import { Link } from 'react-router-dom';

export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} {authUser.lastName} is authenticated!</h1>
      <p>Your email is {authUser.emailAddress}.</p>
      <p>Take look at the <Link to="/">courses</Link></p>
    </div>
  </div>
  );
}