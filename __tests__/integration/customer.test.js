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

  beforeEach(async () => {
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

  it('should be able to get customer data', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .get(`/customers/${body._id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveProperty('_id');
    expect(response.status).toBe(200);
  });

  it('should be able dont find customer', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .get(`/customers/4${body._id.substr(1)}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(expect.objectContaining({}));
    expect(response.status).toBe(200);
  });

  it('should be able to ID invalid', async () => {
    const response = await request(app)
      .get(`/customers/djfjaduisud`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'ID invalid' }),
    );
    expect(response.status).toBe(500);
  });
});
