import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    if (!process.env.DB_USER || !process.env.DB_NAME) {
      console.warn("Database environment variables are missing. Database functionality will be limited.");
      return null;
    }
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

/**
 * Initializes the database and creates the `leads` table if it doesn't exist.
 */
export async function initDB() {
  const currentPool = getPool();
  if (!currentPool) {
    console.warn("Skipping DB initialization: No pool available.");
    return false;
  }

  try {
    const connection = await currentPool.getConnection();
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS leads (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          message TEXT,
          ip_address VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
      await connection.query(createTableQuery);
      console.log("Database initialized: 'leads' table verified/created successfully.");
      return true;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Failed to initialize database table:", error);
    return false;
  }
}

/**
 * Inserts a lead into the database.
 */
export async function saveLead(lead: {
  name: string;
  email: string;
  phone: string;
  message: string;
  ipAddress?: string;
}) {
  const currentPool = getPool();
  if (!currentPool) {
    throw new Error("Database pool is not initialized.");
  }

  // Ensure table exists
  await initDB();

  const query = `
    INSERT INTO leads (name, email, phone, message, ip_address)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const values = [
    lead.name,
    lead.email,
    lead.phone,
    lead.message,
    lead.ipAddress || null,
  ];

  const [result] = await currentPool.execute(query, values);
  return result;
}
