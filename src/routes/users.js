const routes = require("express").Router();

routes.get("/profile", (req, res) => {
  // excluding password
  const user = (({ name, email, id }) => ({ name, email, id }))(req.user);

  return res.status(200).json({ error: false, data: user });
});
module.exports = routes;
