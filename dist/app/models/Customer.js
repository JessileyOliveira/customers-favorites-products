"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginate = require('mongoose-paginate'); var _mongoosepaginate2 = _interopRequireDefault(_mongoosepaginate);

const CustomerSchema = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    favoritesProducts: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

CustomerSchema.plugin(_mongoosepaginate2.default);

exports. default = _mongoose2.default.model('Customers', CustomerSchema);
