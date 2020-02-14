import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import mongoose from 'mongoose';

import databaseConfig from './config/database';

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);

    this.database();
    this.middlewares();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    mongoose.set('useFindAndModify', false);
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
  }
}

export default new App().server;
