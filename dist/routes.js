"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

// controllers
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _CustomerController = require('./app/controllers/CustomerController'); var _CustomerController2 = _interopRequireDefault(_CustomerController);
var _FavoriteProductController = require('./app/controllers/FavoriteProductController'); var _FavoriteProductController2 = _interopRequireDefault(_FavoriteProductController);

// validators
var _Session = require('./app/validators/Session'); var _Session2 = _interopRequireDefault(_Session);
var _Customer = require('./app/validators/Customer'); var _Customer2 = _interopRequireDefault(_Customer);
var _FavoriteProduct = require('./app/validators/FavoriteProduct'); var _FavoriteProduct2 = _interopRequireDefault(_FavoriteProduct);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = _express2.default.Router();

// routes
routes.post('/sessions', _Session2.default, _SessionController2.default.store);

routes.get('/customers', _auth2.default, _CustomerController2.default.index);
routes.get('/customers/:id', _auth2.default, _CustomerController2.default.show);
routes.post('/customers', _auth2.default, _Customer2.default, _CustomerController2.default.store);
routes.put(
  '/customers/:id',
  _auth2.default,
  _Customer2.default,
  _CustomerController2.default.update,
);
routes.delete('/customers/:id', _auth2.default, _CustomerController2.default.destroy);

routes.get(
  '/customers/:id/favorites-products',
  _auth2.default,
  _FavoriteProductController2.default.show,
);
routes.post(
  '/customers/:id/favorites-products',
  _auth2.default,
  _FavoriteProduct2.default,
  _FavoriteProductController2.default.store,
);
routes.delete(
  '/customers/:customerId/favorites-products/:productId',
  _auth2.default,
  _FavoriteProductController2.default.destroy,
);

exports. default = routes;
