const jwt = require("jsonwebtoken");
const helpers = require("../lib/helpers");
const service = require("../services/auth.services");
const secret = require("../config/secret");

const controller = {};

controller.signUp = async (req, res) => {
  try {
    const { user, fullname, email, password, confirm } = req.body;

    //Validamos las contraseñas
    const validPassword = helpers.validPassword(password, confirm);
    if (!validPassword.status) return res.status(400).json(validPassword);

    const newUser = { user, fullname, email, password, fk_rol: 1 };
    newUser.password = await helpers.encryptPassword(newUser.password);

    //Validamos que no haya campos vacios e insertamos en la tabla
    const result = await service.create(newUser);
    if (!result.status) return res.status(400).json(result);

    const userData = { id: result.id, ...newUser, password: "" };

    const token = jwt.sign(
      userData,
      secret.SECRET,
      { expiresIn: 86400 } //24 hours
    );

    return res.status(200).json({ userData, token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

controller.signIn = async (req, res) => {
  try {
    const result = await service.getByEmail(req.body);
    if (!result.status) return res.status(400).json(result);

    const match = await helpers.matchPassword(req.body.password, result.data.password);
    if (!match) return res.status(401).json({ status: false, message: "Incorrect password" });

    const user = { ...result.data, password: "" };
    const token = jwt.sign(user, secret.SECRET, {
      expiresIn: 86400, //24 hours
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = controller;
