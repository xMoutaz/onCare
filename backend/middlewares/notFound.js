function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Page - Not Found - ${req.originalUrl}`);
    next(error);
  }
  module.exports = notFound;