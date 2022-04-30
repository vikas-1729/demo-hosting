// importing required modules
const router = require('express').Router();
const passport = require('passport');

// importing user controller
const userController = require('../controllers/user');

// home page
router.get('/', passport.checkAuthentication, userController.home);

// users route
router.use('/users', require('./user'));

// admin route
router.use('/admin', require('./admin'));

// reviews route
router.use('/reviews', require('./review'));

// exporting router
module.exports = router;