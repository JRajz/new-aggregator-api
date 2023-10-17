const UserModel = require("../models/userModel");
const userModel = new UserModel(); // Create an instance of UserModel

const getUserById = (req, res) => {
  const user = userModel.getById(req.userId);
  return user;
};

const profile = async (req, res) => {
  // excluding password
  const user = (({ name, email, id }) => ({ name, email, id }))(req.user);

  return res.status(200).json({ error: false, data: user });
};

module.exports = { profile, getUserById };
