const jwt = require('jsonwebtoken');
const { getUserById } = require('../controller/userController');

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          return res.status(403).json({
            error: true,
            message: 'Token verification failed',
          });
        }

        req.userId = decode.id;
        const user = getUserById(req, res);
        if (!user) {
          return res
            .status(404)
            .json({ error: true, message: 'User not found' });
        }
        req.user = user;
        next();
      }
    );
  } else {
    return res.status(403).json({
      error: true,
      message: 'Authorization header not found',
    });
  }
};

module.exports = verifyToken;
