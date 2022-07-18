import supertest from 'supertest';
import api from '../index';

const request = supertest(api);


describe('Test Endpoint Service', () => {
  it('should return 200 status code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);

  });
});