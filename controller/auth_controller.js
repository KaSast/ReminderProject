const passport = require("../middleware/passport");
const remindersController = require("../controller/reminder_controller");

let authController = {
  login: (req, res) => {
    console.log("authController login called");
    res.render("auth/login");
  },

  register: (req, res) => {
    
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("authController loginSubmit called");
    passport.authenticate("local", {
      failureRedirect: "/auth/login",
    }, res.redirect('/reminders'))
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
