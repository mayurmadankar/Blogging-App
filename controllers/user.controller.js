export default class UserController {
  async signup(req, res, next) {
    const { fullName, email, password } = req.body;
    // await user.create({
    //   fullName,
    //   email,
    //   password
    // });
    const data = {
      fullName,
      email,
      password
    };
    if (data) {
      res.status(201).send({
        success: true,
        message: "user registered successfully",
        data: data
      });
    }
  }
}
