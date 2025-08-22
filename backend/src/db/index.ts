/*  ========================================================================
    # Backend - Database
    ========================================================================  */

import { MongoClient, type Db } from 'mongodb';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://mongouser:mongopw@localhost:27017/shopping-list?authSource=admin';
const client = new MongoClient(MONGODB_URI);

/**
 * Connects to MongoDB and returns the database instance.
 */
const db: Promise<Db> = (async () => {
  try {
    const connection = await client.connect();
    return connection.db();
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: Server logging
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
})();

/**
 * Handles graceful shutdown on SIGINT and SIGTERM signals.
 */
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await client.close();
  process.exit(0);
});

export default db;
