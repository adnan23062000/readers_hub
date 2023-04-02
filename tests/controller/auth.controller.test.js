const authController = require('../../controller/auth.controller');
const authService = require('../../service/auth.service');
const { validateRequestBody } = require('../../utils/requestValidation.utils');
const { sequelizerErrorValidation } = require('../../utils/sequelizerValidition.utils');

jest.mock('../../utils/requestValidation.utils.js');
jest.mock('../../utils/sequelizerValidition.utils.js');

const req = { body: {username: "adnan2306", email: "adnan2306@gmail.com", password: "adnan1234"} };

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn().mockReturnThis()
};


describe('testing auth controller', () => {

    describe('testing userRegister', () => {
        
        it('should return a empty request body error in the response', async() => {

            const req = { body: {} };

            validateRequestBody.mockReturnValue({
                success: false,
                status: 400,
                message: 'Empty Request Body'
            });

            await authController.userRegister(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Empty Request Body'
            });
        });


        it('should return the one or more fields are empty error in the response', async() => {
            
            const req = { body: {username: "adnan2306", password: "adnan1234"}};

            validateRequestBody.mockReturnValue(false);

            await authController.userRegister(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'one or more fields are empty'
            });
        });


        it('should return success and the newly created jwt token in the response', async() => {

            const mockToken = 'testToken';
            
            
            validateRequestBody.mockReturnValue(false);
            const spyOnMethod = jest.spyOn(authService, 'registerUser').mockResolvedValueOnce(mockToken);


            await authController.userRegister(req, res);


            expect(spyOnMethod).toHaveBeenCalledWith({
                username: "adnan2306", 
                email: "adnan2306@gmail.com", 
                password: "adnan1234"
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.cookie).toHaveBeenCalledWith("jwt", mockToken, { httpOnly: true });
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "user created",
                token: mockToken
            });
        });


        it('should return the error that occurs when user registration fails', async() => {

            const mockError = new Error('User registration failed');

            validateRequestBody.mockReturnValue(null);
            authService.registerUser.mockRejectedValueOnce(mockError);
            sequelizerErrorValidation.mockReturnValue('User registration failed');


            await authController.userRegister(req, res);


            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'User registration failed'
            });

        });

    });

});