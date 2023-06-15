//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const {
  getBarberHour,
  getBarberSpecialties,
  setBarberHour,
  setRegisterBarber,
  setBarberSpecialty,
  updateBarberName,
  updateBarberHour,
  deleteBarber,
  deleleBarberHour,
  deleteBarberSpecialty,
} = require("../controllers/barber");

module.exports = router;

/** @GET **/
router.get("/:id/specialties", getBarberSpecialties);
router.get("/service-hour/", getBarberHour);

/** @POST **/
router.post("/register", setRegisterBarber);
router.post("/specialty", setBarberSpecialty);
router.post("/service-hour", setBarberHour);

/** @PUT **/
router.put("/update", updateBarberName);
router.put("/service-hour", updateBarberHour);

/** @DELETE **/
router.delete("/delete", deleteBarber);
router.delete("/specialty", deleteBarberSpecialty);
router.delete("/service-hour", deleleBarberHour);
