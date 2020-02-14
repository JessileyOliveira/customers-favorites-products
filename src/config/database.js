import dotenv from 'dotenv';

dotenv.config();

export default {
  uri:
    process.env.DB_URL ||
    'mongodb://localhost:27017/customers_favorites_products',
};
