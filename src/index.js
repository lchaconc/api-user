const app = require('./app');


app.listen(app.get("port"), () => {
  console.log(` ${app.get("name") } en http://localhost:${ app.get("port")} escuchando...`);  
});