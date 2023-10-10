const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const userData = require("../data/users.json");
const validator = require("../helpers/validator");
const { writeFile } = require("../helpers/fileOperations");

const signup = async (req, res) => {
  let userPayload = req.body;

  const isValidate = validator.registerData(userPayload);
  if (!isValidate.error) {
    let dbData = JSON.parse(JSON.stringify(userData));

    // Check if the email already exists in your system
    const isEmailDuplicate = dbData.some(
      (user) => user.email === userPayload.email
    );
    if (isEmailDuplicate) {
      // Return a 409 Conflict status code and a message indicating the conflict
      return res
        .status(409)
        .json({ error: true, message: "Email address already exists" });
    }

    // hash password
    userPayload.password = bcrypt.hashSync(userPayload.password, 8);

    // Generate a new UUID for the user
    userPayload.id = uuidv4();

    // Create the current date and time
    userPayload.createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // adding default preferences
    userPayload.preferences = ["top"];

    // writing into memory
    dbData.push(userPayload);

    const isError = await writeFile(dbData, "users");
    if (!isError) {
      return res.status(200).send({
        error: false,
        user: userPayload,
        message: "User registered successfully",
      });
    } else {
      return res.status(400).send({
        error: true,
        message: "Something went wrong while adding user",
      });
    }
  } else {
    return res.status(400).send(isValidate);
  }
};

const login = (req, res) => {
  let userPayload = req.body;

  const isValidate = validator.loginData(userPayload);
  if (!isValidate.error) {
    let dbData = JSON.parse(JSON.stringify(userData));

    // checking for email exists in the system
    const user = dbData.find((user) => user.email === userPayload.email);
    if (!user) {
      return res.status(404).send({ error: true, message: "User not found" });
    }

    // Check if the provided password matches with the user password
    const isValidPassword = bcrypt.compareSync(
      userPayload.password,
      user.password
    );
    if (isValidPassword) {
      // generating the token
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({
        error: false,
        message: "Login Successful",
        accessToken: token,
      });
    } else {
      return res.status(404).send({ error: true, message: "Invalid Password" });
    }
  } else {
    return res.status(400).send(isValidate);
  }
};

module.exports = { signup, login };
