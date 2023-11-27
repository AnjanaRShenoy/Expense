import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  addExpense,
  data

} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/addExpense", addExpense )
router.get("/data", data )

export default router;