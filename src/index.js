import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { createUserTable } from './migrations/createUserTable.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * Routes
 */
app.use('/api', userRoutes);

/**
 * Create tables
 */
createUserTable();

/**
 * Testing postgres connection
 */

// app.get('/db', async (req, res) => {
//   const { rows } = await pool.query('SELECT current_database()');
//   console.log(`The database name is ${rows[0].current_database}`);
//   res.status(200).json(`The database name is ${rows[0].current_database}`);
// });

/**
 * 404 Fallback for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`,
  });
});

/**
 * Error handling middleware
 */
app.use(errorHandler);

/**
 * Server running
 */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
