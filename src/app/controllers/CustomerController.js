import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    res.send({ success: true });
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const customer = await Customer.findById(id);

      return res.send(customer);
    } catch (error) {
      return res.status(500).send({ error: 'ID invalid' });
    }
  }

  async store(req, res) {
    const { email } = req.body;

    if (await Customer.findOne({ email })) {
      return res.status(409).json({
        error: 'customer already exists',
      });
    }

    const customer = await Customer.create(req.body);

    return res.send(customer);
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

export default new CustomerController();
