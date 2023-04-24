const express = require('express');
const router = express.Router();
const { allUsers, getUserData, updateUser, recoveryPass, signIn, signUp } = require('../controllers/user');

module.exports = router;

/** @GET **/
router.get('/all', allUsers)
router.get('/update', getUserData)

/** @POST **/
router.post('/sign-in', signIn)
router.post('/sign-up', signUp)

/** @PUT **/
router.put('/recover-password', recoveryPass)
router.put('/update', updateUser)