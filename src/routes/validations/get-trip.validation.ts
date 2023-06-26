import { query } from "express-validator";

export interface IGetTrip {
  startGte: number | null;
  startLte: number | null;
  distanceGte: number;
  limit: number;
  offset: number;
}

export const GetTripValidation = [
  query("start_gte").isInt().optional(),
  query("start_lte").isInt().optional(),
  query("distance_gte").isNumeric().optional().withMessage("Es un entero. Opcional."),
  query("limit").isInt().optional(),
  query("offset").isInt().optional(),
];
