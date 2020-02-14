import app from './app';
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.SERVER_PORT || 3000);
