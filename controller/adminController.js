const checkIsAdmin = require("../middleware/checkAuth").checkIsAdmin;

module.exports = {
    sessions: (req, res) => {
        res.render("auth/admin", { /*add sessions from a session store? unsure of this*/ });
    },
}