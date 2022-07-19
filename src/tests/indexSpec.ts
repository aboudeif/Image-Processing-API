import supertest from 'supertest';
import api from '../index';
import path from 'path';
import fs from 'fs';

const request = supertest(api);

describe('Test endpoint service', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

describe("Test images routes", () => {

  it("should return a jpg/jpeg image file", async () => {
    // make an array of thumbnail images 
    const images: string[] = await fs.promises.readdir(path.join(__dirname, '../../storage/thumb'));
    // select random image to be tested
    const randomImage = images[Math.floor(Math.random() * images.length)].split('.')[0];
    // extract parameters from the random image
    const fileName = randomImage.split('_')[0];
    const width = randomImage.split('_')[1].split('x')[0];
    const height = randomImage.split('_')[1].split('x')[1];

    const response = await request.get(`/images?filename=${fileName}&width=${width}&height=${height}`);
    expect(response.type).toBe('image/jpeg');
    });
  });
  
describe("test image processing function", () => {
  it("should resize random image", async () => {
  // make an array of thumbnail images 
  const images: string[] = await fs.promises.readdir(path.join(__dirname, '../../storage/thumb'));
  // select random image to be tested
  const randomImage = images[Math.floor(Math.random() * images.length)].split('.')[0];
  // input random size
  const fileName = randomImage.split('_')[0];
  const width = Math.floor(Math.random() * 1000);
  const height = Math.floor(Math.random() * 1000);

  await request.get(`/images?filename=${fileName}&width=${width}&height=${height}`);
  expect(fs.existsSync(path.join(__dirname, `../../storage/thumb/${fileName}_${width}x${height}.jpg`))).toBeTruthy();
  });
});