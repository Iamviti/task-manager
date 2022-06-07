const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');
require ('dotenv/config');

/* MIDDLEWARES */
//Creamos un middleware para asegurarnos que siempre que se realice
// una request, el bodyParser se ejecute;
app.use((cors()));
app.use(bodyParser.json());


// IMPORTAMOS ROUTES
const userRoutes = require ('./routes/user');
const listRoutes = require ('./routes/lists');
//Creamos un Middleware (todo lo que llegue a /users, las userRoutes correrán)
app.use('/user', userRoutes);
app.use('/list' , listRoutes);





// Cómo empezamos a escuchar al servidor
app.listen(3000, ()=>{
    console.log("Servidor arrancado > Puerto 3000");
});

// Connect DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology: true},60000000)
.then(console.log("Conectado a la DB"))
.catch((err) => console.log(err));