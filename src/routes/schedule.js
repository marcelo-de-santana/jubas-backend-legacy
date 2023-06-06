const express = require("express");
const router = express.Router();
const dbConn = require('../services/mysql');
const bodyParser = require("body-parser");
const {
    getSchedule,
    getScheduleServices,
    getWeekday,
    getAvailableTimes,
    getSpecialties,
    setService,
    updateService,
    setCategory,
    updateCategory,
    deleteCategory,
    deleteService
} = require("../controllers/schedule");

module.exports = router;

/** @GET **/
router.get('/', getSchedule)
router.get('/services', getScheduleServices)
router.get('/week', getWeekday)
router.get('/specialties', getSpecialties)

/** @POST **/
router.post('/available-times', getAvailableTimes)
router.post('/category', setCategory)
router.post('/service', setService)

/** @PUT **/
router.put('/category', updateCategory)
router.put('/service', updateService)

/** @DELETE **/
router.delete('/category', deleteCategory)
router.delete('/service', deleteService)