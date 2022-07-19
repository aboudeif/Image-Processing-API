import supertest from 'supertest';
import api from '../index';
import fs from 'fs';
import path from 'path';

const request = supertest(api);

describe('Test Endpoint Service', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);

  });
});



      
  
  

describe("Test images routes", () => {

  const images: string[] = [];

  // test random image url
  it("should return an image", async () => {

  // make array of images from thumb folder

  fs.readdir(path.join(__dirname, '../../storage/thumb'), async (err, files) => {
    if(err) {
      throw err;
    }
    files.forEach(file => {
      images.push(file.split('.')[0]);
    });

    // select random image to be tested
    const randomImage = images[Math.floor(Math.random() * images.length)];
    console.log(randomImage);

    // extract parameters from the random image
    const fileName = randomImage.split('_')[0];
    const width = randomImage.split('_')[1].split('x')[0];
    const height = randomImage.split('_')[1].split('x')[1];

    
      const response = await request.get(`/images?filename=${fileName}&width=${width}&height=${height}.jpg`);
      expect(response.status).toBe(200);
    });
  });
  
});