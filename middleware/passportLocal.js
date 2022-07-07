const passport = require("passport");
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

module.exports = passport.use(localLogin);
