import express, { type Request, type Response } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createTripValidation, type IReading } from "./validations/create-trip.validation";
import { TripService } from "../services/trip.service";
import { Trip } from "../models/trip.model";
import { GetTripValidation, type IGetTrip } from "./validations/get-trip.validation";

const router = express.Router();
router.get("/trip", GetTripValidation, validateRequest, async (req: Request, res: Response) => {
  const {
    start_gte = null,
    start_lte = null,
    distance_gte = 0.05,
    limit = 20,
    offset = 0,
  } = req.query;
  const filter: IGetTrip = {
    startGte: start_gte ? Number(start_gte) : null,
    startLte: start_lte ? Number(start_lte) : null,
    distanceGte: Number(distance_gte),
    limit: Number(limit),
    offset: Number(offset),
  };
  const trips = await TripService.getTripsByFilter(filter);
  res.status(200).send(trips);
});

router.post("/trip", createTripValidation, validateRequest, async (req: Request, res: Response) => {
  const data = req.body as IReading;
  const tripData = await TripService.parseReadingToTrip(data);
  const tripCreated = await Trip.create(tripData);
  res.status(201).send(tripCreated);
});

export { router as tripRouter };
