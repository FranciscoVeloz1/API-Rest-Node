const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
};

// const config = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "template",
// };

module.exports = config;
