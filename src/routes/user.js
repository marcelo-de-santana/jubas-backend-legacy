const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  searchUserAndPassword,
  registerUser,
  updateRegistrationStatus,
  recoveryPass,
  updateUser,
  deleteUser,
} = require("../controllers/user");

module.exports = router;

/** @GET **/
router.get("/", getAllUsers);

/** @POST **/
router.post("/sign-in", searchUserAndPassword);
router.post("/sign-up", registerUser);

/** @PUT **/
router.put("/register-status", updateRegistrationStatus);
router.put("/recover-password", recoveryPass);
router.put("/update", updateUser);

/** @DELETE **/
router.delete("/delete", deleteUser);
