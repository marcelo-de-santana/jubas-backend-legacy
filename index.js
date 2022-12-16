//MODULOS
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const sv = require('./src/config/environment.json').server;
    const barber = require('./src/routes/barber');
    const client = require('./src/routes/client');
    const schedule = require('./src/routes/schedule');
    const teste = require('./src/routes/teste');

//CONFIGURAÇÕES
    //server port
    app.listen(sv.port || 3000);
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//ROTAS
    app.use('/barber', barber);
    app.use('/client', client);
    app.use('/schedule', schedule);
    app.use('/teste', teste);
