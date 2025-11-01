import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  return open({
    filename: "./quotes.db",
    driver: sqlite3.Database
  });
}

export async function createTable() {
  const db = await initDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      currency TEXT,
      source TEXT,
      buy_price REAL,
      sell_price REAL,
      timestamp INTEGER
    );
  `);
  await db.close();
}
