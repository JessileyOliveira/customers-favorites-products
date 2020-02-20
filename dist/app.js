"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _database = require('./config/database'); var _database2 = _interopRequireDefault(_database);

class App {
  constructor() {
    this.express = _express2.default.call(void 0, );
    this.server = _http2.default.Server(this.express);

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    _mongoose2.default.connect(_database2.default.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    _mongoose2.default.set('useFindAndModify', false);
  }

  middlewares() {
    this.express.use(_express2.default.json());
    this.express.use(_helmet2.default.call(void 0, ));
    this.express.use(_cors2.default.call(void 0, ));
  }

  routes() {
    this.express.use(_routes2.default);
  }
}

exports. default = new App().server;
