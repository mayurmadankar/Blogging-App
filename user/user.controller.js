import userRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const hashPassword = await bcrypt.hash(password, 12);

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(400).send("User already registered.");
      }
      const userCreated = await this.userRepository.signup(
        name,
        email,
        hashPassword
      );
      if (userCreated._id) {
        res.status(201).send({
          success: true,
          message: "User is created",
          data: [userCreated]
        });
      } else {
        res.status(400).send({
          success: false,
          message: "user not created",
          data: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        res.status(400).send({
          success: false,
          message: "user not registerd",
          data: [user]
        });
      }
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const userResult = await this.userRepository.signin(
          email,
          user.password
        );
        const token = jwt.sign(
          {
            userId: userResult._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "6h"
          }
        );
        res.status(200).send({
          success: true,
          message: "User has been logged In!",
          data: token
        });
      } else {
        res
          .status(400)
          .send({ success: false, message: "Invalid Crediential" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
