export const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  // 1. Malformed JSON Body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid JSON payload format',
    });
  }

  // 2. Postgres: Unique Constraint Violation (duplicate email)
  if (err.code === '23505') {
    return res.status(409).json({
      status: 409,
      message: 'Conflict: Email already exists',
      error: err.detail,
    });
  }

  // 3. Postgres: Invalid text representation (e.g. non-numeric ID passed to integer column)
  if (err.code === '22P02') {
    return res.status(400).json({
      status: 400,
      message: 'Invalid input syntax (e.g. user ID must be an integer)',
    });
  }

  // 4. Postgres: Not-Null Violation
  if (err.code === '23502') {
    return res.status(400).json({
      status: 400,
      message: `Missing required field: ${err.column}`,
    });
  }

  // 5. Database Connection Failed
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      status: 503,
      message: 'Database service unavailable. Please try again later.',
    });
  }

  // Default: Internal Server Error

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
