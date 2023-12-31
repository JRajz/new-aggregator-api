const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('../helpers/validator');
const UserModel = require('../models/userModel');

const userModel = new UserModel(); // Create an instance of UserModel

const signup = async (req, res) => {
  const userPayload = req.body;

  const isValidate = validator.registerData(userPayload);
  if (!isValidate.error) {
    const dbData = userModel.getAll();

    // Check if the email already exists in your system
    const isEmailDuplicate = dbData.some(
      (user) => user.email === userPayload.email
    );
    if (isEmailDuplicate) {
      // Return a 409 Conflict status code and a message indicating the conflict
      return res
        .status(409)
        .json({ error: true, message: 'Email address already exists' });
    }

    try {
      const user = await userModel.save(userPayload);

      return res.status(200).send({
        error: false,
        user,
        message: 'User registered successfully',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        error: true,
        message: 'Something went wrong while adding user',
      });
    }
  } else {
    return res.status(400).send(isValidate);
  }
};

const login = (req, res) => {
  const userPayload = req.body;

  const isValidate = validator.loginData(userPayload);
  if (!isValidate.error) {
    const dbData = userModel.getAll();

    // checking for email exists in the system
    // eslint-disable-next-line no-shadow
    const user = dbData.find((user) => user.email === userPayload.email);
    if (!user) {
      return res.status(404).send({ error: true, message: 'User not found' });
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
        message: 'Login Successful',
        accessToken: token,
      });
    }
    return res.status(404).send({ error: true, message: 'Invalid Password' });
  }
  return res.status(400).send(isValidate);
};

module.exports = { signup, login };
