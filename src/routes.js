import express from 'express';

// controllers
import CustomerController from './app/controllers/CustomerController';
import SessionController from './app/controllers/SessionController';

// validators
import validatorSession from './app/validators/Session';
import validatorCustomer from './app/validators/Customer';

import auth from './app/middlewares/auth';

const routes = express.Router();

// routes
routes.get('/customers', auth, CustomerController.index);
routes.get('/customers/:id', auth, CustomerController.show);
routes.post('/customers', auth, validatorCustomer, CustomerController.store);
routes.put(
  '/customers/:id',
  auth,
  validatorCustomer,
  CustomerController.update,
);
routes.delete('/customers/:id', auth, CustomerController.destroy);

routes.post('/sessions', validatorSession, SessionController.store);

export default routes;
