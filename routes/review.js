// importing required modules
const router = require('express').Router();

// importing review conttroller
const reviewController = require('../controllers/review');

// sending review to employee
router.get('/sendReview', reviewController.sendReview);

// exporting router
module.exports = router;