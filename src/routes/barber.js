//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const { getBarbers, getBarberHour, setBarberHour, updateBarberHour, deleleBarberHour, getServices } = require("../controllers/barber");

module.exports = router;

/** @GET **/
router.get('/all', getBarbers)
router.get('/service-hour', getBarberHour)
router.get('/service-by-catogory', getServices)

/** @POST **/
router.post('/service-hour', setBarberHour)

/** @PUT **/
router.put('/service-hour', updateBarberHour)

/** @DELETE **/
router.delete('/service-hour', deleleBarberHour)