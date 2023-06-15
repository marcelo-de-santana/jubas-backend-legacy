//MODULOS
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

//iMPORTAÇÃO DE ROTAS
const barber = require("./src/routes/barber");
const schedule = require("./src/routes/schedule");
const user = require("./src/routes/user");

//CONFIGURAÇÕES
app.listen(process.env.SERVER_PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//ROTAS
app.use("/barber", barber);
app.use("/schedule", schedule);
app.use("/user", user);
