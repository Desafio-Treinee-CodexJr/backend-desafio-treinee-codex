const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');

const url = config.bd_string;
const options = { wtimeoutMS: 2500, maxPoolSize: 5 };
const port = process.env.PORT || 9000;

console.log(`Iniciando a API em env ${process.env.NODE_ENV.toUpperCase()}`);
mongoose.connect(url, options);
//mongoose.set('useNewUrlParser', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(port);

module.exports = app;
