const bcrypt = require("bcryptjs");

const helpers = {};

//Encriptamos la contraseña
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//Confirmamos que las contraseñas coincidan
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
  }
};

//Validamos la contraseña
helpers.validPassword = (password, confirm) => {
  const messages = [
    "Dejaste un campo vacío",
    "La contraseña debe tener mínimo 8 caracteres",
    "Las contraseñas no coinciden",
  ];
  if (password === "") return { status: false, message: messages[0] };
  if (password.length < 8) return { status: false, message: messages[1] };
  if (password !== confirm) return { status: false, message: messages[2] };

  return { status: true, message: "success" };
};

//Verificamos que no haya campos vacios
helpers.emptyPayload = (payload) => {
  const object = Object.values(payload);
  for (const o of object) {
    if (o === null || o === undefined || o === "") {
      return { status: false, message: "You left an empty field" };
    }
  }

  return { status: true, message: "" };
};

module.exports = helpers;
