import dotenv from 'dotenv'
dotenv.config()

export default {
  'secret':'my secret',
  'database': process.env.MONGODB_URL
};