const express = require("express");
const passportLocal = require("../middleware/passportLocal");
const passportGit = require("../middleware/passportGit");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

/* router.post('/login',
    passportLocal.authenticate('local', { failureRedirect: 'auth/login' }),
    function (req, res) {
        res.redirect('/reminders');
    }); */

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

router.get('auth/github',
    passportGit.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passportGit.authenticate('github', { failureRedirect: 'auth/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/reminders');
    });

router.get("/register", (req, res) => res.render("auth/register"));
//router.post("/register", authController.registerSubmit);

module.exports = router;