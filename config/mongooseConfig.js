import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const baseurl = process.env.DB_URL || "0.0.0.0:27017";

export const connectUsingMongoose = async () => {
  try {
    await mongoose
      .connect(baseurl, {
        dbName: "BloggingApp"
      })
      .then(() => console.log("Mongodb connect using mongoose"))
      .catch((err) =>
        console.error("Error while connecting to db:", err.message)
      );
  } catch (err) {
    console.log(`Error while connecting to db ${err.message}`);
  }
};
