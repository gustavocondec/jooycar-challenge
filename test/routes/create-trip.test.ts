import request from "supertest";
import { app } from "../../src/app";

const bodyOk = {
  readings: [
    {
      time: 1642500462000,
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
const expectedResponse = {
  id: expect.any(String),
  start: expect.objectContaining({
    time: expect.any(Number),
    lat: expect.any(Number),
    lon: expect.any(Number),
    address: expect.any(String),
  }),
  end: expect.objectContaining({
    time: expect.any(Number),
    lat: expect.any(Number),
    lon: expect.any(Number),
    address: expect.any(String),
  }),
  distance: expect.any(Number),
  duration: expect.any(Number),
  overspeedsCount: expect.any(Number),
  boundingBox: expect.arrayContaining([
    expect.objectContaining({
      lat: expect.any(Number),
      lon: expect.any(Number),
    }),
  ]),
};

describe("POST /trip", () => {
  describe("Should throw error when body sended is incorrect", () => {
    test("Bad request when body missing", async () => {
      await request(app).post("/trip").send().expect(400);
    });
  });
  test("validate body", async () => {
    await request(app).post("/trip").send(bodyOk).expect(201);
  });
  describe("Validate result when data sended is ok", () => {
    test("Should returns body appropiated", async () => {
      const response = await request(app).post("/trip").send(bodyOk);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(expectedResponse);
    });
    test("response field start is data from reading with minor time ", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      const readingMinorTime = bodyOk.readings.sort((a, b) => a.time - b.time)[0];

      expect(response.body.start.lat).toEqual(readingMinorTime.location.lat);
      expect(response.body.start.lon).toEqual(readingMinorTime.location.lon);
      expect(response.body.start.time).toEqual(readingMinorTime.time);
    });
    test("response field end is data from reading with mayor time", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      bodyOk.readings.sort((a, b) => a.time - b.time);
      const readingMajorTime = bodyOk.readings[bodyOk.readings.length - 1];
      expect(response.body.end.lat).toEqual(readingMajorTime.location.lat);
      expect(response.body.end.lon).toEqual(readingMajorTime.location.lon);
      expect(response.body.end.time).toEqual(readingMajorTime.time);
    });
    test("Response field time is duration total of travel", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      bodyOk.readings.sort((a, b) => a.time - b.time);

      const timeTotal = bodyOk.readings[bodyOk.readings.length - 1].time - bodyOk.readings[0].time;
      expect(response.body.duration).toBe(timeTotal);
    });
    test("Response field distance is time x duration", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      bodyOk.readings.sort((a, b) => a.time - b.time);

      let distance = 0;
      for (let i = 0; i < bodyOk.readings.length - 1; i++) {
        const start = bodyOk.readings[i];
        const final = bodyOk.readings[i + 1];
        const timeSeconds = (final.time - start.time) / 1000;
        const timeHours = timeSeconds / 3600;
        distance = distance + ((start.speed + final.speed) / 2) * timeHours;
      }

      expect(response.body.distance).toEqual(distance);
    });

    test("Response field overspeedsCount", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      bodyOk.readings.sort((a, b) => a.time - b.time);

      let overspeedsCount = 0;
      let countConsecutives = 0;
      bodyOk.readings.forEach((r) => {
        if (r.speed > r.speedLimit) {
          countConsecutives++;
        } else {
          if (countConsecutives > 0) {
            overspeedsCount++;
            countConsecutives = 0;
          }
        }
      });

      expect(response.body.overspeedsCount).toBe(overspeedsCount);
    });
    test("response field boundingBox is the boundingbox del trip", async () => {
      const response = await request(app).post("/trip").send(bodyOk);

      let minLat = Number.MAX_VALUE;
      let maxLat = -Number.MAX_VALUE;
      let minLon = Number.MAX_VALUE;
      let maxLon = -Number.MAX_VALUE;
      for (const coordenada of bodyOk.readings) {
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

      expect(response.body.boundingBox.length).toBe(boundingBox.length);
      response.body.boundingBox.forEach((b: any) => {
        expect(boundingBox).toContainEqual(b);
      });
    });
  });
});
