// importing user and review schema
const User = require('../models/User');
const Review = require('../models/Review');

// send review to employee
module.exports.sendReview = async (req, res) => {
  try {
    let recipient = await User.findById(req.query.Recipient);
    if (!recipient) {
      console.log("Recipient is not valid!");
      return res.redirect('back');
    }
    let toRev = req.user.to;
    const index = toRev.indexOf(recipient.id);
    if (index > -1) {
      toRev.splice(index, 1);
    }
    for (let i = 0; i < recipient.from.length; i++) {
      if (req.user) {
        if (recipient.from[i] == req.user.id) {
          const new_review = Review.create({
            to: recipient.id,
            from: req.user.id,
            review: req.query.review,
          });
          if (!new_review) {
            console.log("Review is not created!");
          }
          await User.findByIdAndUpdate(req.user.id, { to: toRev });
          return res.redirect('/users/mywork');
        }
      } else {
        console.log("User is not logged in!");
        return res.redirect("/user/login");
      }
    }
    return res.redirect('/users/mywork');
  } catch (error) {
    console.log(error);
    return;
  }
}