//DEPENDENCIAS
const express = require("express");
const router = express.Router();
const {
    getBarbers, getBarberHour, getServices, getCatogories, getBarberSpecialties,
    setBarberHour, setService, setCategory,
    updateBarberHour, updateService,  updateCategory,
    deleleBarberHour, deleteService, deleteCategory, deleteBarberSpecialty
} = require("../controllers/barber");

module.exports = router;

/** @GET **/
router.get('/', getBarbers)
router.get('/service-hour/', getBarberHour)
router.get('/services-by-category', getServices)
//router.get('/category', getCatogories)
router.get('/:id/specialties', getBarberSpecialties)

/** @POST **/
router.post('/service-hour', setBarberHour)
router.post('/service-by-catogory', setService)
// router.post('/category', setCategory)

/** @PUT **/
router.put('/service-hour', updateBarberHour)
router.put('/service-by-catogory', updateService)
// router.put('/category', updateCategory)

/** @DELETE **/
router.delete('/service-hour', deleleBarberHour)
router.delete('/service-by-catogory', deleteService)
// router.delete('/category', deleteCategory)
router.delete('/specialties', deleteBarberSpecialty)