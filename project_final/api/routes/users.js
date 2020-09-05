const express = require('express');
const router = express.Router();
const middleware = require('./customMiddleware');
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs'); 
const { check, validationResult } = require('express-validator/check');

// import models 
const Users = require('../models').Users;


// Returns the currently authenticated user
router.get('/api/users/', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    //on a successful authentication user equals current user
    const user = req.currentUser;

    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
      });
      res.status(200).end(); 
}));

// Creates a user, sets the Location header to "/", and returns no content
router.post('/api/users', [
    /*
        firstName
        lastName
        emailAddress
    */
    check('firstName')
        .exists()
        .withMessage('Please provide a value for "firstName"'),
    check('lastName')
        .exists()
        .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
        .exists()
        .withMessage('Please provide a value for "emailAddress"'),

    ], middleware.asyncHandler(async(req, res) => {

    const newUser = req.body;
    //we need to make sure the users has added all required fields
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
        // collect all of the errors
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({ errors: errorMessages });
    } else {
        // Get the user from the request body.
        newUser.password = bcryptjs.hashSync(newUser.password);
        const hashedUser = await Users.create(newUser);
        res.location('/')
        res.status(201).end(); 
    }
}));

module.exports = router;
