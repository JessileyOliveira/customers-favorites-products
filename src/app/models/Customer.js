import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CustomerSchema = new mongoose.Schema(
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
    favoriteProducts: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

CustomerSchema.plugin(mongoosePaginate);

export default mongoose.model('Customers', CustomerSchema);
