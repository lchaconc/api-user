const { Router } = require("express");
const ctrUsuario = require("../controllers/user.controller");
const routerUsuario = Router();

routerUsuario.post("/crear-cuenta", ctrUsuario.crearCuenta);

routerUsuario.post("/iniciar-sesion", ctrUsuario.iniciarSesion);


routerUsuario.get("/activar-cuenta/", ctrUsuario.activarCuenta);

module.exports = routerUsuario;
