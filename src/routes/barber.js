//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const {
    getBarbers,
    getBarberHour, setBarberHour, updateBarberHour, deleleBarberHour,
    getServices, setService, updateService, deleteService
} = require("../controllers/barber");

module.exports = router;

/** @GET **/
router.get('/all', getBarbers)
router.get('/service-hour', getBarberHour)
router.get('/service-by-catogory', getServices)

/** @POST **/
router.post('/service-hour', setBarberHour)
router.post('/service-by-catogory', setService)

/** @PUT **/
router.put('/service-hour', updateBarberHour)
router.put('/service-by-catogory', updateService)

/** @DELETE **/
router.delete('/service-hour', deleleBarberHour)
router.delete('/service-by-catogory', deleteService)