import type mongoose from "mongoose";
import { Schema, model, type Document, type Model } from "mongoose";

export interface ITrip {
  start: {
    time: number;
    lat: number;
    lon: number;
    address: string;
  };
  end: {
    time: number;
    lat: number;
    lon: number;
    address: string;
  };
  distance: number;
  duration: number;
  overspeedsCount: number;
  boundingBox: Array<{
    lat: number;
    lon: number;
  }>;
}

export interface ITripDocument extends ITrip, Document {}

interface ITripModel extends Model<ITripDocument> {
  build: (attrs: ITrip) => ITripDocument;
}

const tripSchema = new Schema(
  {
    // id: { type: String },
    start: {
      time: { type: Number },
      lat: { type: Number },
      lon: { type: Number },
      address: { type: String },
    },
    end: {
      time: { type: Number },
      lat: { type: Number },
      lon: { type: Number },
      address: { type: String },
    },
    distance: { type: Number },
    duration: { type: Number },
    overspeedsCount: { type: Number },
    boundingBox: Array<{
      lat: { type: number };
      lon: { type: number };
    }>,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

tripSchema.statics.build = (attrs: ITrip) => {
  return new Trip(attrs);
};

const Trip = model<ITripDocument, ITripModel>("Trip", tripSchema);
export { Trip };
