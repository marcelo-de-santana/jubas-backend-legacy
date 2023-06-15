//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const {
  getBarbers,
  getBarberHour,
  getServices,
  getCatogories,
  getBarberSpecialties,
  setBarberHour,
  setService,
  setCategory,
  setRegisterBarber,
  setBarberSpecialty,
  updateBarberName,
  updateBarberHour,
  updateService,
  updateCategory,
  deleteBarber,
  deleleBarberHour,
  deleteService,
  deleteCategory,
  deleteBarberSpecialty,
} = require("../controllers/barber");

module.exports = router;

/** @GET **/
router.get("/service-hour/", getBarberHour);
router.get("/:id/specialties", getBarberSpecialties);
// router.get('/services-by-category', getServices)
// router.get('/', getBarbers)
//router.get('/category', getCatogories)

/** @POST **/
router.post("/register", setRegisterBarber);
router.post("/specialty", setBarberSpecialty);
router.post("/service-hour", setBarberHour);
// router.post('/service-by-catogory', setService)
// router.post('/category', setCategory)

/** @PUT **/
router.put("/update", updateBarberName);
router.put("/service-hour", updateBarberHour);
// router.put('/service-by-catogory', updateService)
// router.put('/category', updateCategory)

/** @DELETE **/
router.delete("/delete", deleteBarber);
router.delete("/service-hour", deleleBarberHour);
router.delete("/specialty", deleteBarberSpecialty);
// router.delete('/service-by-catogory', deleteService)
// router.delete('/category', deleteCategory)
