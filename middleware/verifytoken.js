const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.send("Token Missing");
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET);

    next();

  } catch (err) {

    return res.send("Invalid Token");

  }
};

module.exports = verifyToken;