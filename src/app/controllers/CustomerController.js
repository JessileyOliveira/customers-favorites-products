import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    res.send({ success: true });
  }

  async show(req, res) {}

  async store(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}

export default new CustomerController();
