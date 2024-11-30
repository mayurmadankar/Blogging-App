import "./env.js";
import express from "express";
import path from "path";
import userRouter from "./user/user.routes.js";
import { connectUsingMongoose } from "./config/mongooseConfig.js";

const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
  connectUsingMongoose();
});
