const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAccessLevels,
  searchUserAndPassword,
  registerUser,
  updateRegistrationStatus,
  recoveryPass,
  updateAccount,
  updateUser,
  updateUserAccessLevel,
  deleteUser,
} = require("../controllers/user");

module.exports = router;

/** @GET **/
router.get("/", getAllUsers);
router.get("/access-level", getAccessLevels);

/** @POST **/
router.post("/sign-in", searchUserAndPassword);
router.post("/sign-up", registerUser);

/** @PUT **/
router.put("/register-status", updateRegistrationStatus);
router.put("/recover-password", recoveryPass);
router.put("/update/:cpf", updateAccount);
router.put("/update", updateUser);
router.put("/access-level", updateUserAccessLevel);

/** @DELETE **/
router.delete("/delete", deleteUser);
