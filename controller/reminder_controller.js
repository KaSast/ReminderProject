let database = require("../database");

function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  })
}

let remindersController = {
  reminders: req.user.reminders,

  list: (req, res) => {
    res.render("reminder/index", this.reminders);
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = this.eminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", this.reminders );
    }
  },

  create: (req, res) => {
    let reminder = {
      id: this.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    
    this.reminders.push(reminder);
    console.log( this.reminders );
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = reminders.find(function (reminder) {
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
    const objIndex = reminders.findIndex((obj => obj.id == reminderToUpdate));
    reminders[objIndex].title = req.body.title;
    reminders[objIndex].description = req.body.description;
    reminders[objIndex].completed = isComepleted;

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // implement this code
    const reminderToDelete = req.params.id;
    const updatedReminders = this.reminders.filter((reminder) => {
      return reminder.id != reminderToDelete;
    });;
    this.reminders = updatedReminders;
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
