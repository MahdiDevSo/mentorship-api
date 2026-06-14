import express from "express";
import { protect } from "../src/Middlewares/auth.js";
import { authorize } from "../src/Middlewares/authorize.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({
    message: `Welcome to the admin dashboard, ${req.user.name}`,
  });
});

export default router;
