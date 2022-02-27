const pool = require("../lib/database");
const helpers = require("../lib/helpers");

const serviceTemplate = {};

const TABLE = "tasks";

//Listamos todos los tasks
serviceTemplate.list = async () => {
  try {
    const data = await pool.query(`select * from ${TABLE}`);
    return { status: true, data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Obtenemos un solo task
serviceTemplate.get = async (id) => {
  try {
    const data = await pool.query(`select * from ${TABLE} where id = ?`, [id]);
    return { status: true, data: data[0] };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Creamos un nuevo task
serviceTemplate.create = async (payload) => {
  try {
    const validation = helpers.emptyPayload(payload);
    if (!validation.status) return validation;

    const result = await pool.query(`insert into ${TABLE} set ?`, [payload]);
    return { status: true, id: result.insertId };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Actualizamos un task
serviceTemplate.update = async (id, payload) => {
  try {
    const validation = helpers.emptyPayload(payload);
    if (!validation.status) return validation;

    const result = await pool.query(`update ${TABLE} set ? where id = ?`, [payload, id]);
    return { status: true, result };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

//Eliminamos un task
serviceTemplate.delete = async (id) => {
  try {
    const result = await pool.query(`delete from ${TABLE} where id = ?`, [id]);
    return { status: true, result };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

module.exports = serviceTemplate;
