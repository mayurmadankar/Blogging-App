import express from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

// userRouter.get("/signup", (req, res) => {
//   userController.signup(req, res);
// });
userRouter.post("/signup", (req, res) => {
  userController.signup(req, res);
});
export default userRouter;
