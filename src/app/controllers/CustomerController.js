import Customer from '../models/Customer';

class CustomerController {
  async index(req, res) {
    const customers = await Customer.paginate(
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
      const customer = await Customer.findById(id).select('name email');

      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
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

  async update(req, res) {
    const { id } = req.params;
    const { email: newEmail } = req.body;

    try {
      const { email } = await Customer.findById(id);

      if (
        email !== newEmail.toLowerCase() &&
        (await Customer.findOne({ email: newEmail }))
      ) {
        return res.status(409).json({
          error: 'customer already exists',
        });
      }

      const customer = await Customer.findByIdAndUpdate(id, req.body, {
        new: true,
        projection: {
          name: 1,
          email: 1,
        },
      });

      return res.send(customer);
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    try {
      await Customer.findByIdAndDelete(id);

      return res.send({ message: 'Customer deleted' });
    } catch (error) {
      return res.status(400).send({ error: 'ID invalid' });
    }
  }
}

export default new CustomerController();
