const {Schema, model } = require("mongoose");

const usuarioSchema = new Schema ({
    correo : {
        type: String,
        required: true,
        trim: true
    },
    clave : {
        type: String,
        require: true
    }
});

module.exports = model( "Usuario", usuarioSchema );