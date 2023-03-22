module.exports = {

    pagination: (page, limit) => {
        
        const paginationObj = {};

        paginationObj.page = Math.abs(page? page:1);
        paginationObj.limit = Math.abs(limit? limit:5);

        return paginationObj;

    },


    getStartingSerial: (page, limit) => {
        return (limit*(page-1));
    }



}