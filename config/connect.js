// importing mongoose module
const mongoose = require('mongoose');

// module to connect to database
const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

// exporting connectDB module
module.exports = connectDB;