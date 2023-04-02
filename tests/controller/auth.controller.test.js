const authController = require('../../controller/auth.controller');
const authService = require('../../service/auth.service');
const { isRequestBodyEmpty } = require('../../utils/requestValidation.utils');
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

            isRequestBodyEmpty.mockReturnValue({
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

            isRequestBodyEmpty.mockReturnValue(false);

            await authController.userRegister(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'one or more fields are empty'
            });
        });


        it('should return success and the newly created jwt token in the response', async() => {

            const mockToken = 'testToken';
            
            
            isRequestBodyEmpty.mockReturnValue(false);
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

            isRequestBodyEmpty.mockReturnValue(null);
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

    
    describe('testing userLogin', () => {

        it('should return a empty request body error in the response', async() => {

            const req = { body: {} };

            isRequestBodyEmpty.mockReturnValue({
                success: false,
                status: 400,
                message: 'Empty Request Body'
            });

            await authController.userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Empty Request Body'
            });
        });


        it('should return the one or more fields are empty error in the response', async() => {
            
            const req = { body: {password: "adnan1234"} };

            isRequestBodyEmpty.mockReturnValue(false);

            await authController.userLogin(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'one or more fields are empty'
            });
        });


        it('should return success and the newly created jwt token in the response', async() => {

            const mockToken = 'testToken';
            
            
            isRequestBodyEmpty.mockReturnValue(false);
            const spyOnMethod = jest.spyOn(authService, 'userLogin').mockResolvedValueOnce(mockToken);


            await authController.userLogin(req, res);


            expect(spyOnMethod).toHaveBeenCalledWith("adnan2306", "adnan1234");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.cookie).toHaveBeenCalledWith("jwt", mockToken, { httpOnly: true });
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "user logged in"
            });
        });


        it('should return the error that occurs when user login fails', async() => {

            const mockError = new Error('User login failed');

            isRequestBodyEmpty.mockReturnValue(null);
            authService.userLogin.mockRejectedValueOnce(mockError);


            await authController.userLogin(req, res);


            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'User login failed'
            });

        });

    })

});