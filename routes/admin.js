// importing required modules
const router = require('express').Router();
const passport = require('passport');

// importing admin controller
const adminController = require('../controllers/admin');

// get admin page
router.get('/admin-page', passport.checkAuthentication, adminController.adminPage);

// set reviewers to employee
router.post('/set-Reviewers', passport.checkAuthentication, adminController.setReviewers);

// make an employee admin
router.get('/make-admin/:id', passport.checkAuthentication, adminController.makeAdmin);

// view list of employees
router.get('/view-employees', passport.checkAuthentication, adminController.viewEmployees);

// delete an employee
router.get('/delete-employee/:id', passport.checkAuthentication, adminController.deleteEmployee);

// exporting router
module.exports = router;