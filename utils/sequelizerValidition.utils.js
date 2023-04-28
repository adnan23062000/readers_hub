module.exports = {

    sequelizerErrorValidation: (error) => {
            
        if(error.name === 'SequelizeUniqueConstraintError'){
            const attributeName = Object.keys(error.fields)[0];
            if(attributeName === 'PRIMARY')
                return 'Username already exists'
            if(attributeName === 'email')
                return 'email already exists'
        }

        if(error.name === 'SequelizeValidationError'){
            return error.message;
        }

        
    }

}