import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import projectRouter from "./project.route";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/project", projectRouter);

export default router;
