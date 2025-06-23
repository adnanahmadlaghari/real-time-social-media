
const socketPagination = (payload = {}) => {
  const page = parseInt(payload.page) || 1;
  const limit = parseInt(payload.limit) || 10;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
    page,
  };
};

module.exports = socketPagination;
