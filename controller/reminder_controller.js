function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  })
}

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", {reminders: req.user.reminders});
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", {reminders: req.user.reminders} );
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToUpdate = req.params.id;

    let isComepleted = req.body.completed === 'true' ? true : false;
    
    const objIndex = req.user.reminders.findIndex((obj => obj.id == reminderToUpdate));
    req.user.reminders[objIndex].title = req.body.title;
    req.user.reminders[objIndex].description = req.body.description;
    req.user.reminders[objIndex].completed = isComepleted;

    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // implement this code
    const reminderToDelete = req.params.id;
    const updatedReminders = req.user.reminders.filter((reminder) => {
      return reminder.id != reminderToDelete;
    });;
    req.user.reminders = updatedReminders;
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
