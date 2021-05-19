const Usuario = require("../models/Usuario");
const bcrypt = require('bcrypt');
const mailer = require("../mailer");
const saltRounds = 10;


exports.crearCuenta = async (req, res) => {
    const {correo, clave} = req.body;
  
  const hashed = await bcrypt.hash (clave, saltRounds )
  const nuevoUsuario = new Usuario({clave: hashed, correo} );
  console.log(nuevoUsuario);
  await nuevoUsuario.save();
  const info = await mailer(correo, "abcdef456987"); 
  console.log(info);  
  res.json({
      isOk:true,
      msj: `Su cuenta ha sido creada, pero debe acceder al correo ${correo} en no más de una hora para activarla y poder acceder a la aplicación. `
  });
}

exports.activarCuenta = async (req, res) => {
    console.log(req.params);
    res.send(
        `
        <strong> Cuenta activada de forma satisfactoria ✌️ </strong>
        <hr>
        ¡Puede iniciar sesión en la aplicación! 
        `
     )
} 