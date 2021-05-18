const express = require("express");
const usuariosRouter = require("./routes/user.routes");
const app = express();

// settings
app.set("name", "API users");
app.set("port", process.env.port || 3500);

app.use(express.json());
app.use("/usuarios", usuariosRouter);

module.exports = app;
