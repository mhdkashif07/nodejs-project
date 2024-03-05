exports.successResponse = (req, res, status, code, message, doc) => {
  if(!doc){
   return res.status(code).json({
      status: status,
      requestedAt: req.requestTime,
      data: doc,
    });
  }
  return res.status(code).json({
    status: status,
    total: doc.length,
    requestedAt: req.requestTime,
    data: doc,
  });
 
};

exports.successResponsePagination = (req, res, status, code, message, doc) => {
  res.status(code).json({
    status: status,
    requestedAt: req.requestTime,
    total: doc.length,
    data: doc,
  });
};
