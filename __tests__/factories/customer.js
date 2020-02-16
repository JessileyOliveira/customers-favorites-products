import faker from 'faker';
import { factory } from 'factory-girl';

import Customer from '../../src/app/models/Customer';

factory.define('Customers', Customer, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

export default factory;
