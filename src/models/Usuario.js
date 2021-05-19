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
    },
    activo: {
        type: Boolean,
        default: false
    }
});

module.exports = model( "Usuario", usuarioSchema );