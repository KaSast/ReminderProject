const userModel = require("../database").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findByEmail(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByGitHubIdOrCreate = (profile) => {
    let user = getUserById(profile.id);

    if(!user) {
      user = {
        id: parseInt(profile.id),
        name: profile.displayName,
        reminder: [],
        role: user,
      }
    }

    return user;
};

function isUserValid(user, password) {
  return user.password === password;
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGitHubIdOrCreate,
};
