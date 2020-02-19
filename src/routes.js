import express from 'express';

// controllers
import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import FavoriteProductController from './app/controllers/FavoriteProductController';

// validators
import validatorSession from './app/validators/Session';
import validatorCustomer from './app/validators/Customer';
import validatorFavoriteProduct from './app/validators/FavoriteProduct';

import auth from './app/middlewares/auth';

const routes = express.Router();

// routes
routes.post('/sessions', validatorSession, SessionController.store);

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

routes.get(
  '/customers/:id/favoritesProducts',
  auth,
  FavoriteProductController.show,
);
routes.post(
  '/customers/:id/favoritesProducts',
  auth,
  validatorFavoriteProduct,
  FavoriteProductController.store,
);
routes.delete(
  '/customers/:customerId/favoritesProducts/:productId',
  auth,
  FavoriteProductController.destroy,
);

export default routes;
