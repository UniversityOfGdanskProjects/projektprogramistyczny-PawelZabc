import { MongoClient } from 'mongodb';

let client;
let db;

export const connectToDatabase = async () => {
  if (db) return db;

  try {
    client = await MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db();
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Failed to connect to the database');
  }
};