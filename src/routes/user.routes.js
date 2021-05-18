const { Router } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = Router();

router.post("/", async (req, res) => {
    const {correo, clave} = req.body;
  
  const hashed = await bcrypt.hash (clave, saltRounds )
  const nuevoUsuario = new Usuario({clave: hashed, correo} );
  console.log(nuevoUsuario);
  const isOk = await nuevoUsuario.save();

  res.json(isOk);
});

module.exports = router;
