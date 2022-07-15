const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { MemoryStore } = require("express-session");
require('dotenv').config();

const sessionStore = new MemoryStore()

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const reminderRoute = require("./routes/reminderRoute");
const authRoute = require("./routes/authRoute");
const { Collection } = require("mongoose");


app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", reminderRoute);
app.use("/auth", authRoute);

const { ensureAuthenticated, checkIsAdmin } = require("./middleware/checkAuth");
const expressEjsLayouts = require("express-ejs-layouts");

app.get("/auth/admin", ensureAuthenticated, checkIsAdmin, (req, res) => {
  sessionStore.all((err, sessions) => {
    console.log(sessions);
    let sessionToPass = sessions;
    if (err) {
      console.log(err); //incorrect error handling..
    }
    res.render("auth/admin", { sessionList: sessionToPass });
  })
});

app.get("/auth/admin/revoke", ensureAuthenticated, checkIsAdmin, (req, res) => {
  let sessionId = req.params.id;

  sessionStore.destroy(sessionId, (req, res) => {
    res.redirect("/auth/admin")
  })
})

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
