import { Pool } from 'pg';
import { Client } from '@elastic/elasticsearch';
import { config } from '../config';

const dbPool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});

const esClient = new Client({
  node: config.ELASTICSEARCH_URL,
});

export const connectToDatabase = async () => {
  try {
    await dbPool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export const getDbPool = () => dbPool;

export const getEsClient = () => esClient;

export const closeDatabaseConnection = async () => {
  await dbPool.end();
  console.log('Database connection closed');
};