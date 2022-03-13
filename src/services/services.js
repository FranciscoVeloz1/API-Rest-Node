const pool = require("../lib/database");
const helpers = require("../lib/helpers");

class Services {
  constructor(table, view = "") {
    this.table = table;
    this.view = view;
  }

  async List() {
    try {
      const data = await pool.query(`select * from ${this.table}`);
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async ListView() {
    try {
      const data = await pool.query(`select * from ${this.view}`);
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async Get(id) {
    try {
      const data = await pool.query(`select * from ${this.table} where id = ?`, [id]);
      if (data.length === 0) return { status: false, message: "not found" };

      return { status: true, data: data[0] };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async GetView(id) {
    try {
      const data = await pool.query(`select * from ${this.view} where id = ?`, [id]);
      if (data.length === 0) return { status: false, message: "not found" };

      return { status: true, data: data[0] };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async Create(payload) {
    try {
      const validation = helpers.emptyPayload(payload);
      if (!validation.status) return validation;

      const result = await pool.query(`insert into ${this.table} set ?`, [payload]);
      return { status: true, id: result.insertId };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async Update(id, payload) {
    try {
      const validation = helpers.emptyPayload(payload);
      if (!validation.status) return validation;

      const result = await pool.query(`update ${this.table} set ? where id = ?`, [payload, id]);
      return { status: true, result };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async Delete(id) {
    try {
      const result = await pool.query(`delete from ${this.table} where id = ?`, [id]);
      return { status: true, result };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}

module.exports = Services;
