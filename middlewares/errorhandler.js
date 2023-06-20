module.exports = (err, req, res, next) => {
  console.log("error handling is working");
  console.log(err);
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
