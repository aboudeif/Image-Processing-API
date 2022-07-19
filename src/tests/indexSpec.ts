import supertest from 'supertest';
import api from '../index';

const request = supertest(api);


describe("Test images routes", () => {
  const images = [
    "encenadaport",
    "fjord",
    "icelandwaterfall",
    "palmtunnel",
    "santamonica",
  ];
  const random = images[Math.floor(Math.random() * images.length)];
  it("should return an image", async () => {
    const response = await request.get("/" + random);
    expect(response.status).toBe(200);
  });
});