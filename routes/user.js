// importing required modules
const router = require('express').Router();
const passport = require('passport');

// importing user controller
const userController = require('../controllers/user')

// login page
router.get('/login', userController.login);

// register new account
router.get('/register', userController.register);

// logout
router.get('/logout', userController.destroySession);

// review page
router.get('/mywork', userController.mywork);

// create new user
router.post('/create-user', userController.createUser);

// create session for login
router.post('/create-session', passport.authenticate(
  'local',
  { failureRedirect: '/users/login' }
), userController.createSession);

// exporting router
module.exports = router;