"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _Customer = require('../models/Customer'); var _Customer2 = _interopRequireDefault(_Customer);

var _api = require('../services/api'); var _api2 = _interopRequireDefault(_api);

class FavoriteProductController {
  async show(req, res) {
    const { id } = req.params;

    try {
      const favoritesProducts = await _Customer2.default.findById(id).select(
        'favoritesProducts',
      );

      return res.send(favoritesProducts);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }

  async store(req, res) {
    const { productId } = req.body;
    const { id } = req.params;

    try {
      const customer = await _Customer2.default.findById(id);

      // Can not find customer
      if (!customer) {
        return res.status(409).send({ error: 'Customer not found' });
      }

      // call API proucts
      const { data } = await _api2.default.get(`/api/product/${productId}`);

      // check product already exists in favorites
      const productExist = customer.favoritesProducts.find(
        favoriteProduct => favoriteProduct.id === data.id,
      );

      if (productExist) {
        return res.status(409).json({
          error: 'Product already exists in favorites',
        });
      }

      // add new product infavorites
      customer.favoritesProducts.push(data);

      await customer.save();

      return res.send(customer.favoritesProducts);
    } catch (error) {
      if (error instanceof _mongoose2.default.Error) {
        return res.status(400).send({ error: 'ID invalid' });
      }

      return res.status(409).send({ error: 'Product not found' });
    }
  }

  async destroy(req, res) {
    const { customerId, productId } = req.params;

    try {
      const customer = await _Customer2.default.findById(customerId).select(
        'favoritesProducts',
      );

      const customerFavoritesProducts = customer.favoritesProducts.filter(
        favoriteProduct => favoriteProduct.id !== productId,
      );

      customer.favoritesProducts = customerFavoritesProducts;

      customer.save();

      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }
}

exports. default = new FavoriteProductController();
