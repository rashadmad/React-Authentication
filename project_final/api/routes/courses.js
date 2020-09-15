const express = require('express');
const router = express.Router();
const middleware = require('./customMiddleware');
const { check, validationResult } = require('express-validator/check');

// import models 
const Courses = require('../models').Courses;
const Users = require('../models').Users;

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/api/courses', middleware.asyncHandler(async(req, res) => {
    const arrayOfCourses = await Courses.findAll({})
    res.send(arrayOfCourses)
    res.status(200).end(); 
}));
// GET /api/courses/:id 200 - Returns a course (including the user that owns the course) for the provided course ID
router.get('/api/courses/:id', middleware.asyncHandler(async(req, res) => {
    const specificCourse = await Courses.findOne({
        where: {
            id: req.params.id
        }, 
        include: Users
    });
    console.log(specificCourse.User.dataValues.firstName)
    res.send(specificCourse);
    res.status(200).end();
}));
// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/api/courses', [
    /*
        title
        description
    */
    check('title')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "title"'),
    check('description')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "description"'),
    ], middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            res.status(400).json({ errors: errorMessages });
        } else {
            const newCourse = await Courses.create(req.body);
            res.location(req.url + "/" + newCourse.id); 
            res.status(201).end(); 
        }    
}));
// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/api/courses/:id',
[
    /*
        title
        description
    */
    check('title')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "title"'),
    check('description')
        .exists({checkNull: true, checkFalsy: true})
        .withMessage('Please provide a value for "description"'),
    ], middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const errorMessages = errors.array().map(error => error.msg);
            res.status(400).json({ errors: errorMessages });
        } else {
            const courseToUpdate = await Courses.findByPk(req.params.id);
            courseToUpdate.update(req.body);
            res.status(204).end(); 
        }
}));

// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/api/courses/:id',middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const courseToBeDeleted = await Courses.findByPk(req.params.id)
    await courseToBeDeleted.destroy();
    res.status(204).end(); 
}));

module.exports = router;