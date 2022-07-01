const userModel = require("../database").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  console.log("userController getUserByEmailIdAndPassword called");
  let user = userModel.findByEmail(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  console.log("userController getUserById called");
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  console.log("userController isUserValid called");
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
