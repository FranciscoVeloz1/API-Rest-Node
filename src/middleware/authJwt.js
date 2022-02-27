const jwt = require("jsonwebtoken");
const pool = require("../lib/database");
const secret = require("../config/secret");

const auth = {};

auth.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "Not token provided" });
    }

    const decoded = jwt.verify(token, secret.SECRET);
    req.userId = decoded.id;
    const user = await pool.query("select * from users where id = ?", [
      req.userId,
    ]);

    if (user.length == 0) {
      return res.status(404).json({ message: "no user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

auth.isAdminIn = async function (req, res, next) {
  const user = await pool.query("select * from users where id = ?", [
    req.userId,
  ]);

  if (user[0].fk_rol === 2) {
    next();
    return;
  }

  return res.status(403).json({ message: "Unauthorized" });
};

module.exports = auth;
