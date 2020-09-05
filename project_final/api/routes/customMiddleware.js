const express = require('express');
///You can use the basic-auth npm package to parse the Authorization header into the user's credentials.
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');

const Users = require('../models').Users;

//async handler

  const asyncHandler = (functionToCallBack) => {
    return async(req, res, next) => {
      try {
        await functionToCallBack(req, res, next)
      } catch(error){
        res.status(500).send(error)
        console.log(error)
      }
    }
  }

//authentication middleware
  ///Add a middleware function that attempts to get the user credentials from the Authorization header set on the request.
  
  const authenticateUser = async (req, res, next) => {
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);
    let message = ''

    // Check if the credentials where parsed

    if (credentials) {
      /* The user's credentials will contain two values: 
        a name value—the user's email address 
        a pass value—the user's password (in clear text). 
      */

      const users = await Users.findAll();
      const user = users.find(u => u.emailAddress === credentials.name); 
      //check if the credentials have both a unique email and a password
      if (user) {
        //compare user's password to the Authorization header
        const authenticated = bcryptjs
          .compareSync(credentials.pass, user.password);
        //rings true if password matches
        if (authenticated) {
          console.log(
            `Authentication successful for email: ${credentials.name}`
          );
          req.currentUser = user;
        } else {
          message = `Authentication failure for name: ${credentials.name}`;
        }
      } else {
        message = `emailAddress not found for: ${credentials.name}`;
      }
    } else {
      message = "Auth header not found";
    }
    // If user authentication failed...
    if (message) {
      console.warn(message);

      // Return a response with a 401 Unauthorized HTTP status code.
      res.status(401).json({ message: "Access Denied" });
    } else {
      // Or if user authentication succeeded...
      // Call the next() method.
      next();
    }
  };

  module.exports = { 
    asyncHandler,
    authenticateUser 
  }