const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Something went wrong' : err.message;
  
    res.status(statusCode).json({
      success: false,
      error: message
    });
  };
  
  module.exports = errorHandler;