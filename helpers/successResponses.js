exports.successResponse = (req, res, status, code, message, body) => {
  res.status(code).json({
    status: status,
    requestedAt: req.requestTime,
    data: body,
  });
};
