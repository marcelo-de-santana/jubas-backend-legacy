const express = require("express");
const router = express.Router();
const dbConn = require("../services/mysql");
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
  deleteService,
  setNewService,
} = require("../controllers/schedule");

module.exports = router;

/** @GET **/
router.get("/", getSchedule);
router.get("/specialties", getSpecialties);
router.get("/week", getWeekday);
// router.get('/services', getScheduleServices)

/** @POST **/
router.post("/register-service", setNewService);
router.post("/category", setCategory);
router.post("/service", setService);
// router.post('/available-times', getAvailableTimes)

/** @PUT **/
router.put("/category", updateCategory);
router.put("/service", updateService);

/** @DELETE **/
router.delete("/category", deleteCategory);
router.delete("/service", deleteService);
