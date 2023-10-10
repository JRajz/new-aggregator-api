const { validatePreferences } = require("../helpers/validator");
const userData = require("../data/users.json");
const { writeFile } = require("../helpers/fileOperations");

const getUserPreferences = (req, res) => {
  return res
    .status(200)
    .json({ error: false, data: { preferences: req.user.preferences } });
};

const updateUserPreferences = async (req, res) => {
  // validate preferences
  const isValidate = validatePreferences(req.body.preferences);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  let dbData = JSON.parse(JSON.stringify(userData));

  const index = dbData.findIndex((obj) => obj.id === req.user.id);

  dbData[index].preferences = req.body.preferences;

  const isError = await writeFile(dbData, "users");
  if (!isError) {
    return res.status(200).send({
      error: false,
      message: "User preferences updated successfully",
    });
  } else {
    return res.status(400).send({
      error: true,
      message: "Something went wrong while updating preferences",
    });
  }
};

module.exports = { getUserPreferences, updateUserPreferences };
