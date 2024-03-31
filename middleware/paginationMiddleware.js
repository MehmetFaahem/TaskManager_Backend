const paginate = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  req.pagination = {
    limit,
    startIndex,
    endIndex,
  };

  next();
};

module.exports = paginate;
