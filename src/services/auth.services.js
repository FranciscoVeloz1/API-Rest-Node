const pool = require("../lib/database");
const helpers = require("../lib/helpers");

const serviceAuth = {};

//Obtenemos un usuario por id
serviceAuth.get = async (id) => {
  try {
    const data = await pool.query("select * from users where id = ?", [id]);
    return { status: true, data: data[0] };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Obtenemos un usuario por email
serviceAuth.getByEmail = async (payload) => {
  try {
    const validation = helpers.emptyPayload(payload);
    if (!validation.status) return validation;

    const data = await pool.query("select * from users where email = ?", [payload.email]);

    if (data.length === 0) return { status: false, message: "User not found" };

    return { status: true, data: data[0] };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Creamos un nuevo user
serviceAuth.create = async (payload) => {
  try {
    const validation = helpers.emptyPayload(payload);
    if (!validation.status) return validation;

    const result = await pool.query("insert into users set ?", [payload]);
    return { status: true, id: result.insertId };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = serviceAuth;
