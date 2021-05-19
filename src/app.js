require("dotenv").config();
const express = require("express");
const routerUsuario = require("./routes/user.routes");
const conexionDB = require("./db.conexion");
const app = express();

conexionDB();

// settings
app.set("name", "API users");
app.set("port", process.env.PORT || 3700);

app.use(express.json());
app.use("/usuarios", routerUsuario);

module.exports = app;
 