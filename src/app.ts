import express, { json } from "express";
import { tripRouter } from "./routes/trip-route";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());

app.use(tripRouter);
app.all("*", () => {
  throw new Error("No se hallo path");
});
app.use(errorHandler);

export { app };
