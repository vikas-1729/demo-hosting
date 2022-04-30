// importing user and review schema
const User = require('../models/User');
const Review = require('../models/Review');

// creating a new employee
module.exports.createUser = async (req, res) => {
  try {
    if (req.body.password != req.body.confirmpassword) {
      console.log("Password did not match");
      return res.redirect('/users/register');
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exists!");
      return res.redirect('/users/register');
    } else {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        password: req.body.password
      });
      console.log('User created successfully!');
      return res.redirect('back');
    }

  } catch (error) {
    console.log('Error while creating user!', error);
    return res.redirect('/users/register');
  }
}

// creating session
module.exports.createSession = (req, res) => {
  console.log('User logged in.');
  return res.redirect('/');
}

// destroying session
module.exports.destroySession = (req, res) => {
  req.logout();
  console.log('User logged out.');
  return res.redirect('/users/login');
}

// go to login page
module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('home');
  }
  return res.render('login');
}

// go to register page
module.exports.register = (req, res) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return res.render('adminregister');
  }
  if (req.isAuthenticated()) {
    return res.render('home');
  }
  return res.render('register');
}

// reviews to be send to employees
module.exports.mywork = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      console.log("User not logged in");
      return res.redirect('/users/login');
    }
    let user = await User.findById(req.user.id);
    let recipients = [];
    for (let i = 0; i < user.to.length; i++) {
      let x = await User.findById(user.to[i]);
      recipients.push(x);
    }
    return res.render('mywork', { recipients });
  } catch (error) {
    console.log(error);
    return;
  }
}

// home page where reviews are listed
module.exports.home = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      console.log("User not logged in");
      return res.redirect('/users/login');
    }
    let review = await Review.find({ to: req.user.id });
    let reviews = [];
    for (let i = 0; i < review.length; i++) {
      let x = await User.findById(review[i].from);
      let curr_review = {
        name: x.name,
        review: review[i].review,
        updated: review[i].updatedAt,
      };
      reviews.push(curr_review);
    }
    return res.render('home', {
      reviews
    });
  } catch (error) {
    console.log(error);
    return;
  }
}