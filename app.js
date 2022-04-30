// importing required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
require('dotenv').config();

// connecting to database
const connectDB = require('./config/connect');
// local database
const dburl = 'mongodb://localhost:27017/Employee-Review-System';
connectDB(dbUrl);

// passport setup session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

const MongoStore = require('connect-mongo');

// for getting form data
app.use(express.urlencoded({ extended: false }));

app.use(expressLayouts);

// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware for use session cookie
app.use(session({
  name: 'employee-review-system',
  secret: 'nothing',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/review',
    autoRemove: 'disabled',
  }, (err) => {
    console.log(err || 'connect-mongodb setup');
  }),
}));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// importing routes
app.use('/', require('./routes/index'));

// port number
const port = process.env.PORT || 4000;

// running the server
app.listen(port, () => console.log(`Server listening to port:${port}`));
