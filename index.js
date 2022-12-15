//MODULOS
    const express = require("express");
    const app = express();
    const sv = require("./src/config/environment.json").server;
    const barber = require("./src/routes/barber");
    const client = require("./src/routes/client");

//CONFIGURAÇÕES
    app.listen(sv.port || 3000);

//ROTAS
    app.use("/barber", barber);
    app.use("/client", client);
