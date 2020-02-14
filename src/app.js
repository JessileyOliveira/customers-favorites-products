import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

class App {
  constructor() {
    this.express = express();

    this.server = http.Server(this.express);
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
