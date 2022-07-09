const database = require("../database");
const addToSessions = require("../database").sessionAccess.addToSessions;
const checkIsAdmin = require("../middleware/checkAuth").checkIsAdmin;

module.exports = {
    addSession: (req, res) => {
        console.log(`addSession function: \n\n ${req.session}`);
        addToSessions(req.session);
        console.log(database.sessions);
    },

    sessions: (req, res) => {
        console.log(`sessionController.sessions called \n user role: ${req.user.role}`);
        console.log(`checkIsAdmin function \n result: ${req.user.role == "admin"}`);
        if(checkIsAdmin) {
            console.log('true')
            res.render("auth/admin", {sessions: database.sessions})
        } else {
            console.log('false');
            res.render("/reminders");
        }
    },
}