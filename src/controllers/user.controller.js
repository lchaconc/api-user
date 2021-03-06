const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../mailer");
const saltRounds = 10;

exports.crearCuenta = async (req, res) => {
  const { correo, clave, confirma } = req.body;

  if (clave != confirma) {
    return res.json ({
      isOk: false, 
      msj: "La contraseña y su confirmación no coinciden"})
  }

  const hashed = await bcrypt.hash(clave, saltRounds);
  const nuevoUsuario = new Usuario({ clave: hashed, correo });
  console.log("nuevoUsuario:", nuevoUsuario);
  await nuevoUsuario.save();
  const TOKEN_DATA = {
    _id: nuevoUsuario._id,
    correo,
  };
  const TOKEN_CONFIG = {
    expiresIn: "1h",
  };
  const TOKEN = jwt.sign(TOKEN_DATA, process.env.SECRET, TOKEN_CONFIG);
  const info = await mailer(correo, TOKEN);
  console.log(info);
  res.json({
    isOk: true,
    msj: `Su cuenta ha sido creada, pero debe acceder al correo ${correo} en no más de una hora para activarla y poder acceder a la aplicación. `,
  });
};

exports.activarCuenta = async (req, res) => {
  const TOKEN = req.query.token;
  console.log(TOKEN);
  const DATA_TOKEN = jwt.verify(TOKEN, process.env.SECRET);
  //console.log(DATA_TOKEN);
  const encontrado = await Usuario.findById(DATA_TOKEN._id);
  console.log("encontrado", encontrado);

  if (encontrado) {
    if (encontrado.correo == DATA_TOKEN.correo) {
      encontrado.activo = true;
      await encontrado.save();
      res.send(`
        <strong> Cuenta activada de forma satisfactoria ✌️ </strong>
        <hr>
        ¡Puede iniciar sesión en la aplicación! 
        `);
    } else {
      res.send(`
        <strong> No se encuentra el usuario para activar </strong>        
        `);
    }
  } else {
    res.send(`
    <strong> No se encuentra el usuario para activar </strong>        
    `);
  }
};

exports.iniciarSesion = async (req, res) => {
  const { correo, clave } = req.body;
  const encontrado = await Usuario.findOne({ correo });
  console.log(encontrado, encontrado);
if (encontrado) {
  if (await bcrypt.compare (clave, encontrado.clave)  ) {
    
    const TOKEN_DATA = {
      _id: encontrado._id,
      correo: encontrado.correo,
    };
    const TOKEN_CONFIG = {
      expiresIn: "1h",
    };
    const token = jwt.sign(TOKEN_DATA, process.env.SECRET, TOKEN_CONFIG);

    res.json({ isOk: true,  token });
  } else {
    res.json({isOk:false, msj: "Clave o correo incorrectos"})
  }
} else {
  res.json({isOk:false, msj: "Clave o correo incorrectos"})
}
  
 

};
