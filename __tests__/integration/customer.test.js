import request from 'supertest';

import Customer from '../../src/app/models/Customer';
import app from '../../src/app';
import factoryCustomer from '../factories/customer';

describe('Customer', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'user@test.com', password: '123456' });

    token = response.body.token;
  });

  afterEach(async () => {
    await Customer.deleteMany({});
  });

  it('Should be no token', async () => {
    const response = await request(app).post('/customers');

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ error: 'token not provided' }),
    );
  });

  it('Should be token invalid', async () => {
    const response = await request(app)
      .post('/customers')
      .set('Authorization', 'bearer igdiusfgiadgsFIUiuiu');

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ error: 'Token invalid' }),
    );
  });

  it('Should be fields invalid', async () => {
    const response = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send({ name: 'Tester Invalid' });

    expect(response.status).toBe(422);
  });

  it('Should be able register customer', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const response = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  it('should be able to duplicate register', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'customer already exists' }),
    );
    expect(response.status).toBe(409);
  });
});
