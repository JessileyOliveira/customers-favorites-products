import request from 'supertest';

import Customer from '../../src/app/models/Customer';
import app from '../../src/app';
import factoryCustomer from '../factories/customer';

describe('Favotire products', () => {
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
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app).post(
      `/customers/${body._id}/favorites-products`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({ error: 'token not provided' }),
    );
  });

  it('Should be fields invalid favorite product register', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({});

    expect(response.status).toBe(422);
  });

  it('should be able to ID invalid', async () => {
    const response = await request(app)
      .post('/customers/djfjaduisud/favorites-products')
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'ID invalid' }),
    );
    expect(response.status).toBe(400);
  });

  it('should be product not found', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1010' });

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'Product not found' }),
    );
    expect(response.status).toBe(409);
  });

  it('should be able to register favorite product', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    expect(response.body).toHaveProperty('title');
    expect(response.status).toBe(200);
  });

  it('should be able dont find customer', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .post(`/customers/4${body._id.substr(1)}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'Customer not found' }),
    );
    expect(response.status).toBe(409);
  });

  it('should be able check duplicate product', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    const response = await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'Product already exists in favorites' }),
    );
    expect(response.status).toBe(409);
  });

  it('should be able to ID invalid when get favorites products', async () => {
    const response = await request(app)
      .get('/customers/djfjaduisud/favorites-products')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'ID invalid' }),
    );
    expect(response.status).toBe(400);
  });

  it('should be able dont find customer', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .get(`/customers/4${body._id.substr(1)}/favorites-products`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(expect.objectContaining({}));
    expect(response.status).toBe(200);
  });

  it('should be able get favorite products', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    const response = await request(app)
      .get(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveProperty('favoritesProducts');
    expect(response.status).toBe(200);
  });

  it('should be able to ID invalid when delete favorites products', async () => {
    const response = await request(app)
      .delete('/customers/djfjaduisud/favorites-products/ydsufh')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({ error: 'ID invalid' }),
    );
    expect(response.status).toBe(400);
  });

  it('should be able delete favorites products', async () => {
    const customer = await factoryCustomer.attrs('Customers');

    const { body } = await request(app)
      .post('/customers')
      .set('Authorization', `bearer ${token}`)
      .send(customer);

    await request(app)
      .post(`/customers/${body._id}/favorites-products`)
      .set('Authorization', `bearer ${token}`)
      .send({ productId: '1bf0f365-fbdd-4e21-9786-da459d78dd1f' });

    const response = await request(app)
      .delete(
        `/customers/${body._id}/favorites-products/1bf0f365-fbdd-4e21-9786-da459d78dd1f`,
      )
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toEqual(
      expect.objectContaining({ message: 'Product deleted' }),
    );
    expect(response.status).toBe(200);
  });
});
