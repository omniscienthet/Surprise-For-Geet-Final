// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Split the connection string manually because of special characters in password
// postgresql://user:password@host:port/database
const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
const match = process.env.DATABASE_URL.match(regex);

let poolConfig;
if (match) {
  const [, user, password, host, port, database] = match;
  poolConfig = {
    user,
    password: decodeURIComponent(password),
    host,
    port: parseInt(port),
    database,
    ssl: true,
  };
} else {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  };
}

export const pool = new pg.Pool(poolConfig);
export const db = drizzle(pool, { schema });
