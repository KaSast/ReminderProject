const express = require("express");
const passport = require("../middleware/passport");
const sessionController = require("../controller/sessionController")
const { forwardAuthenticated, ensureAuthenticated, checkIsAdmin } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post('/login',
    passport.authenticate('local', { failureRedirect: 'auth/login' }),
    function (req, res) {
        console.log(req.session);
        sessionController.addSession(req.session);
        res.redirect('/reminders');
    });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: 'auth/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/reminders');
    });

router.get("/register", (req, res) => res.render("auth/register"));
//router.post("/register", authController.registerSubmit);

router.get("/admin", ensureAuthenticated, checkIsAdmin, sessionController.sessions);

module.exports = router;