import { userModel } from "./user.schema.js";

export default class userRepository {
  async signup(name, email, password) {
    try {
      const newUser = new userModel({ name, email, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log;
    }
  }
  async signin(email, password) {
    try {
      return await userModel.findOne({ email, password });
    } catch (error) {
      console.log;
    }
  }
  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      //   throw new ApplicationError("Error while checking email in database", 500);
    }
  }
}
