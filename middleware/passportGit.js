const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controller/userController");

const githubLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
);

passport.serializeUser(function (user, done) {
    console.log("passport serializeUser called");
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log("passport serializeUser called");
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(githubLogin);
