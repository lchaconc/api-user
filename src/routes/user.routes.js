const { Router } = require("express");
const Usuario = require("../models/Usuario");


const router = Router();

router.post("/", async (req, res) => {
  //console.log(req.body);
  const nuevoUsuario = new Usuario(req.body);
  console.log(nuevoUsuario);
  const isOk = await nuevoUsuario.save();

  res.json(isOk);
});

module.exports = router;
