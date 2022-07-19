import supertest from 'supertest';
import api from '../index';
import path from 'path';
import fs from 'fs';

const request = supertest(api);

describe('Test Endpoint Service', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);

  });
});



      
  
  

describe("Test images routes", () => {

  

  // test random image url
  it("should return an image", async () => {
    // make array of images from thumb folder
    const images: string[] = await fs.promises.readdir(path.join(__dirname, '../../storage/thumb'));
    console.log('this is images: ' + images);

    // select random image to be tested
    const randomImage = images[Math.floor(Math.random() * images.length)].split('.')[0];
    console.log('this is randomImage: ' + randomImage);

    // extract parameters from the random image
    const fileName = randomImage.split('_')[0];
    const width = randomImage.split('_')[1].split('x')[0];
    const height = randomImage.split('_')[1].split('x')[1];
    console.log('this is fileName: ' + '/images?filename='+height);
    
      const response = await request.get(`/images?filename=${fileName}&width=${width}&height=${height}`);
      expect(response.status).toBe(200);
    });
  });
  
