"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _util = require('util');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'token not provided',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret);

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Token invalid',
    });
  }
};

exports. default = auth;
