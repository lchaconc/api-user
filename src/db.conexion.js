const mongoose = require('mongoose');


const conexionDB = async ()=> {
   try {
    const DB = await mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Conexión de forma satisfactoria", DB.connection.name);
   } catch (error) {
       console.log(error);
   }
}

module.exports = conexionDB;