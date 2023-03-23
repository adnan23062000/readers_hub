module.exports = {

  pagination: (page, limit) => {
    const paginationObj = {};

    paginationObj.page = Math.abs(page || 1);
    paginationObj.limit = Math.abs(limit || 5);

    return paginationObj;
  },

  getStartingSerial: (page, limit) => (limit * (page - 1)),

};
