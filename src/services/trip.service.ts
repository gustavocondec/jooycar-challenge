import { type ITrip, type ITripDocument, Trip } from "../models/trip.model";
import { OpenStreetMapService } from "./OpenStreetMapService";
import { type IGetTrip } from "../routes/validations/get-trip.validation";
import { type FilterQuery } from "mongoose";
import { type IReading } from "../routes/validations/create-trip.validation";

export class TripService {
  static async parseReadingToTrip(data: IReading): Promise<ITrip> {
    data.readings.sort((a, b) => a.time - b.time);

    const start = {
      time: data.readings[0].time,
      lat: data.readings[0].location.lat,
      lon: data.readings[0].location.lon,
      address: "",
    };

    const end = {
      time: data.readings[data.readings.length - 1].time,
      lat: data.readings[data.readings.length - 1].location.lat,
      lon: data.readings[data.readings.length - 1].location.lon,
      address: "",
    };

    const [startAddress, endAddress] = await Promise.all([
      OpenStreetMapService.getNameByCoordinates(start.lat, start.lon),
      OpenStreetMapService.getNameByCoordinates(end.lat, end.lon),
    ]);
    start.address = startAddress;
    end.address = endAddress;

    const duration = data.readings[data.readings.length - 1].time - data.readings[0].time;

    let overspeedsCount = 0;
    let countConsecutives = 0;
    data.readings.forEach((r) => {
      if (r.speed > r.speedLimit) {
        countConsecutives++;
      } else {
        if (countConsecutives > 0) {
          overspeedsCount++;
          countConsecutives = 0;
        }
      }
    });

    let distance = 0;
    for (let i = 0; i < data.readings.length - 1; i++) {
      const start = data.readings[i];
      const final = data.readings[i + 1];
      const timeSeconds = (final.time - start.time) / 1000;
      const timeHours = timeSeconds / 3600;
      distance = distance + ((start.speed + final.speed) / 2) * timeHours;
    }

    let minLat = Number.MAX_VALUE;
    let maxLat = -Number.MAX_VALUE;
    let minLon = Number.MAX_VALUE;
    let maxLon = -Number.MAX_VALUE;
    for (const coordenada of data.readings) {
      const { lat, lon } = coordenada.location;
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
    }
    const esquinaNoroeste = { lat: maxLat, lon: minLon };
    const esquinaNoreste = { lat: maxLat, lon: maxLon };
    const esquinaSureste = { lat: minLat, lon: maxLon };
    const esquinaSuroeste = { lat: minLat, lon: minLon };
    const boundingBox = [esquinaNoroeste, esquinaNoreste, esquinaSureste, esquinaSuroeste];
    return { start, end, duration, distance, overspeedsCount, boundingBox };
  }

  static async getTripsByFilter(filters: IGetTrip): Promise<ITripDocument[]> {
    const filterMongoose: FilterQuery<ITripDocument> = {};
    if (filters.distanceGte != null) filterMongoose.distance = { $gt: filters.distanceGte };
    let time = {};
    if (filters.startGte != null) time = { ...time, $gte: Number(filters.startGte) };
    if (filters.startLte != null) time = { ...time, $lte: Number(filters.startLte) };
    if (Object.values(time).length > 0) filterMongoose["start.time"] = time;
    return await Trip.find(filterMongoose).limit(filters.limit).skip(filters.offset);
  }
}
