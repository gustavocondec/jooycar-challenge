import { body } from "express-validator";

export interface IReading {
  readings: Array<{
    time: number;
    speed: number;
    speedLimit: number;
    location: {
      lat: number;
      lon: number;
    };
  }>;
}

export const createTripValidation = [
  body("readings").isArray().notEmpty(),
  body("readings.*.time").notEmpty().isInt(),
  body("readings.*.speed").notEmpty().isInt(),
  body("readings.*.speedLimit").notEmpty().isInt(),
  body("readings.*.location").isObject(),
  body("readings.*.location.lat").notEmpty().isFloat(),
  body("readings.*.location.lon").notEmpty().isFloat(),
];
