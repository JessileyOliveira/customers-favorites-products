import request from 'supertest';

import app from '../../src/app';

describe('Session', () => {
  it('Should fields invalid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({});

    expect(response.status).toBe(422);
  });

  it('Should session invalid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'tester@test.com', password: '123456' });

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'user not found' }),
    );
    expect(response.status).toBe(404);
  });

  it('Should session valid', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'user@test.com', password: '123456' });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });
});
