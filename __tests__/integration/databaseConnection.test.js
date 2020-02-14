import mongoose from 'mongoose';

import databaseConfig from '../../src/config/database';

describe('Database connection', () => {
  it('Should create a connection with mongodb', async () => {
    const connection = await mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    expect(!!connection).toBe(true);
  });
});
