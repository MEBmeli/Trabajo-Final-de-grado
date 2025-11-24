import { Router } from "express";
import { createUser, listUsers } from "../controllers/userController.js";
import { authRequired, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authRequired, adminOnly, createUser);
router.get("/", authRequired, adminOnly, listUsers);

export default router;
