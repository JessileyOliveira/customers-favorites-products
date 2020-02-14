import express from 'express';

import CustomerController from './app/controllers/CustomerController';
import SessionController from './app/controllers/SessionController';

import validatorSession from './app/validators/Session';

const routes = express.Router();

routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.show);
routes.post('/customers', CustomerController.store);
routes.put('/customers/:id', CustomerController.update);
routes.delete('/customers/:id', CustomerController.destroy);

routes.post('/sessions', validatorSession, SessionController.store);

export default routes;
