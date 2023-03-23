module.exports = {

    pagination: (page, limit) => {
        
        const paginationObj = {};

        paginationObj.page = page? page:1;
        paginationObj.limit = limit? limit:5;

        if(page<=0 || isNaN(page))
            paginationObj.page = 1;
        if(limit<=0 || isNaN(limit))
            paginationObj.limit = 5;

        return paginationObj;

    },


    getStartingSerial: (page, limit) => {
        return (limit*(page-1));
    }



}