"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (email === 'user@test.com' && password === '123456') {
      const token = _jsonwebtoken2.default.sign(
        {
          email,
          password,
        },
        _auth2.default.secret,
        {
          expiresIn: _auth2.default.ttl,
        },
      );

      return res.status(200).send({ token });
    }

    return res.status(404).send({ error: 'user not found' });
  }
}

exports. default = new SessionController();
