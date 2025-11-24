import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sistema_adopcion",
  password: "123",
  port: 5432,  // 5432 o 5433
});
