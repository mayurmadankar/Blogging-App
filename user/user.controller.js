import userRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new userRepository();
  }
  async signup(req, res, next) {
    const { name, email, password } = req.body;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).send("User already registered.");
    }
    const userCreated = await this.userRepository.signup(name, email, password);
    if (userCreated) {
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
  }
}
