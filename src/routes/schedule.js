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
    setCategory
} = require("../controllers/schedule");

module.exports = router;

/** @GET **/
router.get('/', getSchedule)
router.get('/services', getScheduleServices)
router.get('/week', getWeekday)
router.get('/specialties', getSpecialties)

/** @POST */
router.post('/available-times', getAvailableTimes)
router.post('category', setCategory)


