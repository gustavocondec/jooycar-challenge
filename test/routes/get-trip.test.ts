import request from "supertest";
import { app } from "../../src/app";
import { type ITrip } from "../../src/models/trip.model";

const START_EXTRA_LOW = 1642500460000;
const START_LOW = 1642500461000;
const START_INTERMEDIATE = 1642500461500;
const START_HIGH = 1642500462000;
const readingStartExtraLow = {
  readings: [
    {
      time: START_EXTRA_LOW,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    },
    {
      time: 1642500466000,
      speed: 26,
      speedLimit: 38,
      location: {
        lat: -33.58013,
        lon: -70.566995,
      },
    },
    {
      time: 1642500470000,
      speed: 28,
      speedLimit: 38,
      location: {
        lat: -33.580117,
        lon: -70.566633,
      },
    },
    {
      time: 1642500474000,
      speed: 13,
      speedLimit: 38,
      location: {
        lat: -33.580078,
        lon: -70.566408,
      },
    },
    {
      time: 1642500478000,
      speed: 18,
      speedLimit: 38,
      location: {
        lat: -33.580005,
        lon: -70.566498,
      },
    },
    {
      time: 1642500482000,
      speed: 32,
      speedLimit: 38,
      location: {
        lat: -33.58002,
        lon: -70.566837,
      },
    },
    {
      time: 1642500486000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580038,
        lon: -70.567265,
      },
    },
    {
      time: 1642500490000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580043,
        lon: -70.56773,
      },
    },
    {
      time: 1642500494000,
      speed: 35,
      speedLimit: 38,
      location: {
        lat: -33.580048,
        lon: -70.56817,
      },
    },
    {
      time: 1642500498000,
      speed: 20,
      speedLimit: 38,
      location: {
        lat: -33.580053,
        lon: -70.568502,
      },
    },
  ],
};
const readingStartLow = {
  readings: [
    {
      time: START_LOW,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    },
    {
      time: 1642500466000,
      speed: 26,
      speedLimit: 38,
      location: {
        lat: -33.58013,
        lon: -70.566995,
      },
    },
    {
      time: 1642500470000,
      speed: 28,
      speedLimit: 38,
      location: {
        lat: -33.580117,
        lon: -70.566633,
      },
    },
    {
      time: 1642500474000,
      speed: 13,
      speedLimit: 38,
      location: {
        lat: -33.580078,
        lon: -70.566408,
      },
    },
    {
      time: 1642500478000,
      speed: 18,
      speedLimit: 38,
      location: {
        lat: -33.580005,
        lon: -70.566498,
      },
    },
    {
      time: 1642500482000,
      speed: 32,
      speedLimit: 38,
      location: {
        lat: -33.58002,
        lon: -70.566837,
      },
    },
    {
      time: 1642500486000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580038,
        lon: -70.567265,
      },
    },
    {
      time: 1642500490000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580043,
        lon: -70.56773,
      },
    },
    {
      time: 1642500494000,
      speed: 35,
      speedLimit: 38,
      location: {
        lat: -33.580048,
        lon: -70.56817,
      },
    },
    {
      time: 1642500498000,
      speed: 20,
      speedLimit: 38,
      location: {
        lat: -33.580053,
        lon: -70.568502,
      },
    },
  ],
};
const readingStartIntermediate = {
  readings: [
    {
      time: START_INTERMEDIATE,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    },
    {
      time: 1642500466000,
      speed: 26,
      speedLimit: 38,
      location: {
        lat: -33.58013,
        lon: -70.566995,
      },
    },
    {
      time: 1642500470000,
      speed: 28,
      speedLimit: 38,
      location: {
        lat: -33.580117,
        lon: -70.566633,
      },
    },
    {
      time: 1642500474000,
      speed: 13,
      speedLimit: 38,
      location: {
        lat: -33.580078,
        lon: -70.566408,
      },
    },
    {
      time: 1642500478000,
      speed: 18,
      speedLimit: 38,
      location: {
        lat: -33.580005,
        lon: -70.566498,
      },
    },
    {
      time: 1642500482000,
      speed: 32,
      speedLimit: 38,
      location: {
        lat: -33.58002,
        lon: -70.566837,
      },
    },
    {
      time: 1642500486000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580038,
        lon: -70.567265,
      },
    },
    {
      time: 1642500490000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580043,
        lon: -70.56773,
      },
    },
    {
      time: 1642500494000,
      speed: 35,
      speedLimit: 38,
      location: {
        lat: -33.580048,
        lon: -70.56817,
      },
    },
    {
      time: 1642500498000,
      speed: 20,
      speedLimit: 38,
      location: {
        lat: -33.580053,
        lon: -70.568502,
      },
    },
  ],
};
const readingStartHigh = {
  readings: [
    {
      time: START_HIGH,
      speed: 9,
      speedLimit: 38,
      location: {
        lat: -33.580158,
        lon: -70.567227,
      },
    },
    {
      time: 1642500466000,
      speed: 26,
      speedLimit: 38,
      location: {
        lat: -33.58013,
        lon: -70.566995,
      },
    },
    {
      time: 1642500470000,
      speed: 28,
      speedLimit: 38,
      location: {
        lat: -33.580117,
        lon: -70.566633,
      },
    },
    {
      time: 1642500474000,
      speed: 13,
      speedLimit: 38,
      location: {
        lat: -33.580078,
        lon: -70.566408,
      },
    },
    {
      time: 1642500478000,
      speed: 18,
      speedLimit: 38,
      location: {
        lat: -33.580005,
        lon: -70.566498,
      },
    },
    {
      time: 1642500482000,
      speed: 32,
      speedLimit: 38,
      location: {
        lat: -33.58002,
        lon: -70.566837,
      },
    },
    {
      time: 1642500486000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580038,
        lon: -70.567265,
      },
    },
    {
      time: 1642500490000,
      speed: 38,
      speedLimit: 38,
      location: {
        lat: -33.580043,
        lon: -70.56773,
      },
    },
    {
      time: 1642500494000,
      speed: 35,
      speedLimit: 38,
      location: {
        lat: -33.580048,
        lon: -70.56817,
      },
    },
    {
      time: 1642500498000,
      speed: 20,
      speedLimit: 38,
      location: {
        lat: -33.580053,
        lon: -70.568502,
      },
    },
  ],
};

describe("GET /trip", () => {
  const COUNT_TRIPS_CREATED = 4;
  beforeAll(async () => {
    await request(app).post("/trip").send(readingStartExtraLow);
    await request(app).post("/trip").send(readingStartLow);
    await request(app).post("/trip").send(readingStartIntermediate);
    await request(app).post("/trip").send(readingStartHigh);
  });
  test("route exists", async () => {
    await request(app).get("/trip").expect(200);
  });

  describe("Receive parameters with no valid values start_gte, start_lte, distance_gte, limit, offset throw bad request exception ", () => {
    test("Send all query string throw exception", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: "",
          start_lte: "",
          distance_gte: "",
          limit: "",
          offset: "",
        })
        .expect(400);
    });

    test("Send all query string throw exception", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: "Hola",
        })
        .expect(400);
    });

    test("Send all query string throw exception", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: 1,
          limit: null,
        })
        .expect(400);
    });
    test("Send all query string throw exception", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: null,
          limit: null,
        })
        .expect(400);
    });
  });
  describe("Receive parameters with valid values for start_gte, start_lte, distance_gte, limit, offset", () => {
    test("Valid values all queris", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: 1,
          start_lte: 1,
          distance_gte: 1,
          limit: 1,
          offset: 1,
        })
        .expect(200);
    });
    test("Valid values start_gte", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_gte: 1,
        })
        .expect(200);
    });
    test("Valid values start_lte", async () => {
      await request(app)
        .get("/trip")
        .query({
          start_lte: 1,
        })
        .expect(200);
    });
    test("Valid values distance_gte", async () => {
      await request(app)
        .get("/trip")
        .query({
          distance_gte: 1,
        })
        .expect(200);
    });
    test("Valid values limit", async () => {
      await request(app)
        .get("/trip")
        .query({
          limit: 1,
        })
        .expect(200);
    });
    test("Valid values offset", async () => {
      await request(app)
        .get("/trip")
        .query({
          offset: 1,
        })
        .expect(200);
    });

    test("Valid values offset", async () => {
      await request(app)
        .get("/trip")
        .query({
          offset: 1,
          limit: undefined,
        })
        .expect(200);
    });
    test("Valid values offset", async () => {
      await request(app)
        .get("/trip")
        .query({
          offset: undefined,
          limit: undefined,
        })
        .expect(200);
    });
  });
  describe("Get data with filter start_gte and start_lte", () => {
    test("Should filter by start_gte", async () => {
      const response = await request(app).get("/trip").query({
        start_gte: START_LOW,
      });
      expect(response.status).toBe(200);
      response.body.forEach((trip: ITrip & { id: string }) => {
        expect(trip.start.time).toBeGreaterThanOrEqual(START_LOW);
      });
    });
    test("Should filter by start_lte", async () => {
      const response = await request(app).get("/trip").query({
        start_lte: START_HIGH,
      });
      expect(response.status).toBe(200);
      response.body.forEach((trip: ITrip & { id: string }) => {
        expect(trip.start.time).toBeLessThanOrEqual(START_HIGH);
      });
    });
    test("Should filter by start_gte and start_lte ", async () => {
      const response = await request(app).get("/trip").query({
        start_gte: START_LOW,
        start_lte: START_HIGH,
      });
      expect(response.status).toBe(200);
      response.body.forEach((trip: ITrip & { id: string }) => {
        expect(trip.start.time).toBeLessThanOrEqual(START_HIGH);
        expect(trip.start.time).toBeGreaterThanOrEqual(START_LOW);
      });
    });
  });
  // describe("Pagination with query offset and limit", () => {
  //   test("Should returns all trips if no sended limit and offset", async () => {
  //     const response = await request(app).get("/trip");
  //     console.log(response.body);
  //     expect(response.body.length).toBe(COUNT_TRIPS_CREATED);
  //   });
  //   test("Should returns all trips if no sended limit. And offset is 0", async () => {
  //     const response = await request(app).get("/trip").query({ offset: 0 });
  //     expect(response.body.length).toBe(COUNT_TRIPS_CREATED);
  //   });
  //   test("Should returns 2 when limit is 2", async () => {
  //     const response = await request(app).get("/trip").query({ limit: 2 });
  //     expect(response.body.length).toBe(2);
  //   });
  //   test("Should returns 1 trip when limit=1 and offset=2", async () => {
  //     const response = await request(app).get("/trip").query({ limit: 1, offset: 2 });
  //     expect(response.body.length).toBe(1);
  //   });
  //   test("Should returns 0 trip when offset= COUNT_TRIPS_CREATED", async () => {
  //     const response = await request(app).get("/trip").query({ offset: COUNT_TRIPS_CREATED });
  //     expect(response.body.length).toBe(0);
  //   });
  // });
});
