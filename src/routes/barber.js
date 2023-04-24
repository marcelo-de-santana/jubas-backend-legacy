//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const { getBarbers, getBarberHours, setBarberHours, updateBarberHours } = require("../controllers/barber");

module.exports = router;

router.get('/all', getBarbers)

router.get('/service-hour', getBarberHours)

router.post('/service-hour', setBarberHours)

router.put('/service-hour', updateBarberHours)

router.delete('/service-hour', getBarberHours)