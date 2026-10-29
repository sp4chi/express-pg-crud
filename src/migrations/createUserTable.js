import { pool } from '../config/db.js';

export const createUserTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  try {
    await pool.query(queryText);
    console.log('User table created.');
  } catch (err) {
    console.log('Error creating user table: ', err);
  }
};
