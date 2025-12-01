import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('wallet_app.db');

export const initDatabase = () => {
  // Buat tabel Accounts
  db.execSync(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      balance REAL NOT NULL
    );
  `);

  // Buat tabel Categories
  db.execSync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      icon TEXT
    );
  `);

  // Buat tabel Transactions
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      date INTEGER NOT NULL,
      note TEXT,
      type TEXT NOT NULL,
      account_id INTEGER NOT NULL,
      category_id INTEGER,
      FOREIGN KEY (account_id) REFERENCES accounts (id),
      FOREIGN KEY (category_id) REFERENCES categories (id)
    );
  `);

  // Seed Data Awal (Jika tabel kosong)
  const result = db.getAllSync('SELECT * FROM accounts');
  if (result.length === 0) {
    db.execSync(`
      INSERT INTO accounts (name, type, balance) VALUES 
      ('Dompet Tunai', 'Cash', 0),
      ('BCA', 'Bank', 0);

      INSERT INTO categories (name, type, icon) VALUES
      ('Gaji', 'INCOME', 'cash'),
      ('Makan', 'EXPENSE', 'food'),
      ('Transport', 'EXPENSE', 'bus'),
      ('Belanja', 'EXPENSE', 'cart');
    `);
  }
};

export default db;
