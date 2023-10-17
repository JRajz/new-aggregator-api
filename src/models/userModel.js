const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { writeFile } = require("../helpers/fileOperations");
const filePath = path.join(__dirname, "..", `data/users.json`);

class User {
  constructor({ name, email, password }) {
    this.id = uuidv4(); // Generate a new UUID for the user
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, 8); // hash password
    this.preferences = ["top"]; // adding default preferences
    this.favouriteArticleIds = [];
    this.readArticleIds = [];
    this.createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss"); // Set created date and time
  }
}

class UserModel {
  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }

    this.filePath = filePath;
    this.userMap = new Map();
    this.loadData();
    UserModel.instance = this;
  }

  async loadData() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      console.log("User json loaded successfully");
      if (data) {
        const userData = JSON.parse(data);
        this.setMap(userData);
      }
    } catch (err) {
      console.log(err);
      console.log("File not exists");
    }
  }

  // Populate the Map with user data
  setMap(parsedData) {
    for (const user of parsedData) {
      this.userMap.set(user.id, user);
    }
  }

  /**
   * returns all users
   * @returns array
   */
  getAll() {
    console.log("Get all users");
    return [...this.userMap.values()];
  }

  /**
   * returns user by id
   * @returns Obj
   */
  getById(userId) {
    if (this.userMap.has(userId)) {
      return this.userMap.get(userId);
    } else {
      // User with the provided ID does not exist
      return null;
    }
  }

  /**
   * insert new user data
   * @returns array
   */
  async save(userData) {
    const data = new User(userData);

    // Convert the Map to an array of values
    let userDataArray = this.getAll();
    userDataArray.push(data);

    try {
      console.log("Inserting user");

      await writeFile(userDataArray, "users");

      // include user in map
      this.userMap.set(data.id, data);

      const { password, ...returnData } = data;
      return returnData;
    } catch (error) {
      console.log("Failed to save user");
      console.log(error);
      return false;
    }
  }

  /**
   * update existing user data
   * @returns array
   */
  async update(data) {
    let userData = this.getById(data.id);

    Object.assign(userData, data);
    // Create a deep copy of the map
    const copiedMap = this.copyMap(this.userMap);

    copiedMap.set(userData.id, userData);

    const userArray = [...copiedMap.values()];

    try {
      console.log("Updating user");

      await writeFile(userArray, "users");

      // include user in map
      this.userMap.set(userData.id, userData);

      return true;
    } catch (error) {
      console.log("Failed to update user");
      console.log(error);
      return false;
    }
  }

  copyMap(map) {
    const newMap = new Map();
    for (const [key, value] of map) {
      newMap.set(key, value);
    }
    return newMap;
  }
}

module.exports = UserModel;
