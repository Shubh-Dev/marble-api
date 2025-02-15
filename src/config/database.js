import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();
const pgp = pgPromise({});

const connection = {
  host: "localhost",
  port: 5432,
  database: "aviation_development",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = pgp(connection);

export default db;
