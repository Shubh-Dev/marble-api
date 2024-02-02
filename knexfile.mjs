import dotenv from "dotenv";
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
};

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
