const userData = require("../data/users.json");

const getUsersById = (userId) => {
  let dbData = JSON.parse(JSON.stringify(userData));

  return dbData.find((user) => user.id == userId);
};

module.exports = { getUsersById };
