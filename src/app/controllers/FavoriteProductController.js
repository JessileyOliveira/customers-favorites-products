import mongoose from 'mongoose';

import Customer from '../models/Customer';

import api from '../services/api';

class FavoriteProductController {
  async show(req, res) {}

  async store(req, res) {
    const { productId } = req.body;
    const { id } = req.params;

    try {
      const customer = await Customer.findById(id);

      // Can not find customer
      if (!customer) {
        return res.status(409).send({ error: 'Customer not found' });
      }

      // call API proucts
      const { data } = await api.get(`/api/product/${productId}`);

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
      if (error instanceof mongoose.Error) {
        return res.status(400).send({ error: 'ID invalid' });
      }

      return res.status(409).send({ error: 'Product not found' });
    }
  }

  async destroy(req, res) {}
}

export default new FavoriteProductController();
