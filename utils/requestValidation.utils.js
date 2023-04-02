module.exports = {

    isRequestBodyEmpty: (body) => {
        
        if(!Object.keys(body).length)
            return {success: false, status: 400, message: "Empty Request Body"};
        
        return null;

    }

}