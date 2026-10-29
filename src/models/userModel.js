import { pool } from '../config/db.js';

export const createUserService = async (name, email) => {
  const { rows } = await pool.query(
    'INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *',
    [name, email],
  );

  return rows[0];
};

export const getAllUsersService = async () => {
  const { rows } = await pool.query('SELECT * FROM users;');
  return rows;
};

export const getUserByIdService = async (id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
  return rows[0];
};

export const updateUserService = async (name, email, id) => {
  const { rows } = await pool.query(
    'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
    [name, email, id],
  );
  return rows[0];
};

export const deleteUserService = async (id) => {
  const { rows } = await pool.query(
    'DELETE FROM users WHERE id=$1 RETURNING *',
    [id],
  );

  return rows[0];
};
