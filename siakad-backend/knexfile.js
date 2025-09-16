<<<<<<< HEAD
import dotenv from 'dotenv';

dotenv.config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations',
      extension: 'js',
      loadExtensions: ['.js'],
    },
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations',
      extension: 'js',
    }
  }

};

export default config;
=======
import { config } from "dotenv";
config();

const knexConfig = {
  development: {
    client: process.env.DB_CLIENT || "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "be-sistem-siakad",
    },
    migrations: {
      directory: "./src/migrations",
      extension: "js",
      loadExtensions: [".js"],
    },
  },
  production: {
    client: process.env.DB_CLIENT || "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "siakad_pt",
    },
    migrations: {
      directory: "./src/migrations",
      extension: "js",
    },
  },
};

export default knexConfig;
>>>>>>> b38638524212dc7c14c7bf0f26e4fcb9f586573a
