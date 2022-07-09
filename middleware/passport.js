const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

const localLogin = new LocalStrategy(
    //Explicitely stated even though it is defualt behavior
    {
        usernameField: "email",
        passwordField: "password",
    },

    (email, password, done) => {
      /*   console.log("local login initialized"); */
        const user = userController.getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again."
            })
    }
);

const githubLogin = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    let user = userController.getUserByGitHubIdOrCreate(profile);
    console.log(`created user: ${user.name}`);
    return cb(null, user);
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



module.exports = passport.use(localLogin), passport.use(githubLogin);
