module.exports = {

  pagination: (page, limit) => {
    const paginationObj = {};

    paginationObj.page = page || 1;
    paginationObj.limit = limit || 5;

    if (page <= 0 || Number.isNaN(Number(page))) { paginationObj.page = 1; }
    if (limit <= 0 || Number.isNaN(Number(limit))) { paginationObj.limit = 5; }

    return paginationObj;
  },

  calculateOffset: (page, limit) => (limit * (page - 1)),
};
