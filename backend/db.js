import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER_NAME,
  host: process.env.DB_HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432, // Port must be a number
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000, // Increased slightly for cloud latency

  // REQUIRED for Aiven and most Cloud DBs
  ssl: {
    rejectUnauthorized: false, // Allows connection without local CA file verification
  },
});

// Test connection on startup
pool.on("connect", (client) => {
  console.log("✅ PostgreSQL Pool Connected to Aiven");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected PG Pool Error", err);
  // Optional: Don't exit if it's just a temporary network blip
  // process.exit(1);
});

export default pool;
