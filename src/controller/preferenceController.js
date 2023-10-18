const { validatePreferences } = require("../helpers/validator");
const UserModel = require("../models/userModel");
const userModel = new UserModel(); // Create an instance of UserModel

const getUserPreferences = (req, res) => {
  return res.status(200).json({
    error: false,
    data: req.user.preferences,
    message: "User Preferences",
  });
};

const updateUserPreferences = async (req, res) => {
  try {
    const preferences = req.body.preferences ?? [];
    // validate preferences
    const isValidate = validatePreferences(preferences);
    if (isValidate.error) {
      return res.status(400).json(isValidate);
    }

    const userData = {
      id: req.user.id,
      preferences: preferences,
    };

    await userModel.update(userData);

    return res.status(200).send({
      error: false,
      message: "User preferences updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: true,
      message: "Something went wrong while updating preferences",
    });
  }
};

module.exports = { getUserPreferences, updateUserPreferences };
