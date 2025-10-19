import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL || '',
  ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL || '',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || '',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || '',
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET || '',
};

export default env;