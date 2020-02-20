"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Customer = require('../models/Customer'); var _Customer2 = _interopRequireDefault(_Customer);

class CustomerController {
  async index(req, res) {
    const customers = await _Customer2.default.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        sort: 'name',
        select: 'name email',
      },
    );

    return res.json(customers);
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const customer = await _Customer2.default.findById(id).select('name email');

      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }

  async store(req, res) {
    const { email } = req.body;

    if (await _Customer2.default.findOne({ email })) {
      return res.status(409).json({
        error: 'customer already exists',
      });
    }

    const customer = await _Customer2.default.create(req.body);

    return res.send(customer);
  }

  async update(req, res) {
    const { id } = req.params;
    const { email: newEmail } = req.body;

    try {
      const { email } = await _Customer2.default.findById(id);

      if (
        email !== newEmail.toLowerCase() &&
        (await _Customer2.default.findOne({ email: newEmail }))
      ) {
        return res.status(409).json({
          error: 'customer already exists',
        });
      }

      const customer = await _Customer2.default.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      await _Customer2.default.findByIdAndDelete(id);

      return res.send({ message: 'Customer deleted' });
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }
}

exports. default = new CustomerController();
