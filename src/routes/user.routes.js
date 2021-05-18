const { Router } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const mailer = require("../mailer");
const saltRounds = 10;

const router = Router();

router.post("/crear-cuenta", async (req, res) => {
    const {correo, clave} = req.body;
  
  const hashed = await bcrypt.hash (clave, saltRounds )
  const nuevoUsuario = new Usuario({clave: hashed, correo} );
  console.log(nuevoUsuario);
  await nuevoUsuario.save();
  const info = await mailer(correo, "abcdef456987"); 
  res.json(info);
});


router.get("/activar-cuenta/:token", async (req, res) => {
    console.log(req.params);
    res.send(
        `
        <strong> Cuenta activada de forma satisfactoria ✌️ </strong>
        <hr>
        Puede iniciar sesión con su usuario y clave al siguiente link: 
        `
     )
} )

module.exports = router;
