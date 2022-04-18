import "dotenv/config";
import { MongoClient } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  client = await MongoClient.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};
