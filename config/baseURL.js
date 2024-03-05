import { config } from 'dotenv';
config();
const baseURL =
  process.env.NODE_ENV === "production"
  ? process.env.PRODUCTION_BASE_URL
  : process.env.DEVELOPMENT_BASE_URL;

export default baseURL;
