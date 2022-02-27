const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();

const options = require("./lib/swaggerOptions");

const app = express();
const specs = swaggerJsDoc(options);

//Settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", require("./routes/template.route"));
app.use("/api", require("./routes/auth.route"));
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;
