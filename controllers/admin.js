// importing user schema
const User = require("../models/User");

// opening admin page by checking if the user is admin
module.exports.adminPage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/users/login');
  } else {
    if (req.user.isAdmin == false) {
      console.log("You are not an admin!!!");
      return res.redirect('/');
    } else {
      try {
        let user = await User.find({});
        var employeeList = [];
        for (let i = 0; i < user.length; i++) {
          var temp = {
            name: user[i].name,
            id: user[i].id,
          };
          employeeList.push(temp);
        }
        return res.render('admin', {
          employeeList
        });
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
};

// set reviewer for employee
module.exports.setReviewers = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/users/login');
    } else {
      let employee = await User.findById(req.user.id);
      if (employee.isAdmin == false) {
        console.log("You are not an admin");
        return res.redirect('/');
      } else if (req.body.Reviewer == req.body.Recipient) {
        return res.redirect('back');
      } else {
        let reviewer = await User.findById(req.body.Reviewer);
        if (!reviewer) {
          return res.redirect('back');
        }
        let recipient = await User.findById(req.body.Recipient);
        if (!recipient) {
          return res.redirect('back');
        }
        reviewer.to.push(recipient);
        reviewer.save();
        recipient.from.push(reviewer);
        recipient.save();
        return res.redirect('back');
      }
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// view list of employees
module.exports.viewEmployees = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        let employees = await User.find({});
        if (employees) {
          return res.render('employees', {
            employees,
          });
        }
      } else {
        console.log("User is not authorized to check list of employees");
        return res.redirect('/');
      }
    } else {
      console.log("User is not authenticated");
      return res.redirect("/users/login");
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// make an employee admin
module.exports.makeAdmin = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        const id = req.params.id;
        await User.findByIdAndUpdate(id, { isAdmin: true });
        return res.redirect('/admin/view-employees');
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

// delete employee
module.exports.deleteEmployee = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) {
        await User.deleteOne({ _id: req.params.id });
        return res.redirect('/admin/view-employees');
      }
    }
  } catch (err) {
    console.log(err);
    return;
  }
};