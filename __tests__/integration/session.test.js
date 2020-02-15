import request from 'supertest';

import app from '../../src/app';

describe('Session', () => {
  it('Should invalid fields', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({});

    expect(response.status).toBe(422);
  });

  it('Should invalid session', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'tester@test.com', password: '123456' });

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'user not found' }),
    );
    expect(response.status).toBe(404);
  });

  it('Should valid session', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'user@test.com', password: '123456' });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });
});
