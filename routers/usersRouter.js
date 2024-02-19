import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  register,
  updateUser,
  getUserByUserId,
} from "../controllers/userControllers.js";
import { userRegisterValidation } from "../middleware/validation.js";
import { auth } from "../middleware/authorization.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();
// "/users"
router.post("/login", login);
router.post("/register", userRegisterValidation, register);

// router.post("/validation", userValidationsTest);

router.patch("/update/:id", auth, isAdmin, updateUser);
router.delete("/delete/:email", deleteUser); // Need to add ",auth, isAdmin," back and troubleshoot it. Works now.
router.get("/allUsers", auth, isAdmin, getAllUsers);
router.get("/verifytoken", auth, (req, res) => {
  res.send({ success: true, data: req.user });
});
router.get("/:userid", getUserByUserId);

export default router;
