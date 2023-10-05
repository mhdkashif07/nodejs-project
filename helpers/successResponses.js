exports.success = (err, _, res, next) => {
  console.error(err);

  if (err) {
    console.error(err); // Log the error for debugging purposes

    // Send an error response to the client
    return res.status(500).json({ error: 'Internal Server Error' });
  } else {
    // If no error was passed to next(), continue to the next middleware
    next();
  }
};
