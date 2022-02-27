const pool = require("../lib/database");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await pool.query("select * from users where user = ?", [
      req.body.user,
    ]);
    if (user.length > 0) {
      return res.status(400).json({ message: "The user already exists" });
    }

    const email = await pool.query("select * from users where email = ?", [
      req.body.email,
    ]);

    if (email.length > 0) {
      return res.status(400).json({ message: "The email already exists" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = checkDuplicateUsernameOrEmail;
