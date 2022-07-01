let database = require("../database");

function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  })
}

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    
    database.cindy.reminders.push(reminder);
    console.log( database.cindy.reminders);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToUpdate = req.params.id;

    let isComepleted = req.body.completed === 'true' ? true : false;
    
    //I originally tried to iterate through the original array but couldnt get it to work... 
    //so this is what I went with because it works (kind of)
    const objIndex = database.cindy.reminders.findIndex((obj => obj.id == reminderToUpdate));
    database.cindy.reminders[objIndex].title = req.body.title;
    database.cindy.reminders[objIndex].description = req.body.description;
    database.cindy.reminders[objIndex].completed = isComepleted;

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // implement this code
    const reminderToDelete = req.params.id;
    const updatedReminders = database.cindy.reminders.filter((reminder) => {
      return reminder.id != reminderToDelete;
    });;
    database.cindy.reminders = updatedReminders;
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
