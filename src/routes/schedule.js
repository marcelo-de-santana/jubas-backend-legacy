const express = require("express");
const router = express.Router();
const dbConn = require("../services/mysql");
const bodyParser = require("body-parser");
const {
  getSchedule,
  getSpecialties,
  getWeekday,
  getScheduleTimes,
  setService,
  setCategory,
  updateService,
  updateCategory,
  deleteService,
  deleteCategory,
  setNewService,
  deleteScheduleTime,
} = require("../controllers/schedule");

module.exports = router;

/** @GET **/
router.get("/", getSchedule);
router.get("/specialties", getSpecialties);
router.get("/week", getWeekday);
router.get("/management", getScheduleTimes);

/** @POST **/
router.post("/register-service", setNewService);
router.post("/category", setCategory);
router.post("/service", setService);

/** @PUT **/
router.put("/category", updateCategory);
router.put("/service", updateService);

/** @DELETE **/
router.delete("/category", deleteCategory);
router.delete("/service", deleteService);
router.delete("/management", deleteScheduleTime);
