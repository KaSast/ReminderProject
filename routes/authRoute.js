const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");

const router = express.Router();

router.get("/login", forwardAuthenticated, authController.login);

router.post('/login', authController.loginSubmit
  /*   passport.authenticate('local', { failureRedirect: '/auth/login' }),
    function (req, res) {
        res.redirect('/reminders');
    } */);

router.get("/register", authController.register);
router.post("/register", authController.registerSubmit);

module.exports = router;