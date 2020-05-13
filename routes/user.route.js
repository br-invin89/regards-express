import express from "express";
import userController from "../controllers/user.controller";
import passportManager from "../config/passport";
const router = express.Router();

router
  .route("/")
  .get(passportManager.authenticate, userController.get);
  //.post(passportManager.authenticate, projectController.add);

export default router;