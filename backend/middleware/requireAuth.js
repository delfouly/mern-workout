const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;
  console.log("authorization:", authorization);
  if (!authorization) {
    res.status(401).json({ message: "Authorization token is required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = requireAuth;
