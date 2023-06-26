import { app } from "./app";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const start = async (): Promise<void> => {
  console.log("mon", process.env.MONGO_URI);
  if (process.env?.MONGO_URI == null) throw new Error("MONGO_URI must be defined");
  if (process.env?.PORT == null) throw new Error("PORT must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (e) {
    console.error("Error connect Mongo!", e);
  }
  app.listen(Number(process.env.PORT), () => {
    console.log("listening on port ", process.env.PORT);
  });
};

void start();
