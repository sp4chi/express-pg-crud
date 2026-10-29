export const validate = (schema) => (req, res, next) => {
  try {
    // safeParse won't throw an unhandled exception; it returns a success flag
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: result.success,
        errors: result.error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    // Replace req.body with the stripped/cleaned data
    req.body = result.data;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Internal validation worker error' });
  }
};
