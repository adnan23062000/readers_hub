const { getUserByUsername, getAllUsers, updateUser, deleteUser } = require('../../service/user.service');
const userController = require('../../controller/user.controller');
const { isParamValid, checkPasswordLength, convertToLowerCase } = require('../../utils/userValidation.utils');
const { contentNegotiate } = require('../../utils/contentNegotiation.utils');
const { pagination } = require('../../utils/pagination.utils');
const { isRequestBodyEmpty } = require('../../utils/requestValidation.utils');

jest.mock('../../utils/requestValidation.utils.js');
jest.mock('../../utils/userValidation.utils.js');
jest.mock('../../service/user.service.js');
jest.mock('../../utils/contentNegotiation.utils.js');
jest.mock('../../utils/pagination.utils.js');


const req = { body: {}, query: {} };
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};


const expectedResponse = [{
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
    createdAt: '2023-03-22T10:30:55.000Z',
    updateAt: '2023-03-28T10:57:10.000Z'
},
{
    username: 'testuser2',
    email: 'testuser2@example.com',
    password: 'password2',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
}];


describe('testing user controller', () => {

    describe('testing getUserByUsername', () => {

        it('should return a invalid request error message', async() => { 
            const req = { params:{ userName: 'mockParam'} };

            isParamValid.mockImplementation((userName) => {
                return false;
            });

            await userController.getUserByUsername(req, res);
 
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'invalid request'
            });

        });


        it('should return user not found error message', async() => {
            const req = { params:{ userName: 'mockParam'} };
            
            isParamValid.mockImplementation((userName) => {
                return true;
            });
            getUserByUsername.mockImplementation((userName) => {
                return false;
            });


            await userController.getUserByUsername(req, res);


            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                data: 'user not found'
            });

        });


        it('should return expected data as response', async() => {
            const req = { params:{ userName: 'mockParam'} };
            

            isParamValid.mockReturnValue(true);
            getUserByUsername.mockImplementation((userName) => {
                return expectedResponse[0];
            });
            contentNegotiate.mockImplementation((req, res, resultArray) => {
                return true;
            });


            await userController.getUserByUsername(req, res);

            
            expect(contentNegotiate).toHaveBeenCalledWith(req, res, [expectedResponse[0]]);

        });


        it('should return an error when getUserByUsername fails', async() => {
            const req = { params:{ userName: 'mockParam'} };
            const mockError = new Error('Error occured');

            isParamValid.mockReturnValue(true);
            getUserByUsername.mockRejectedValueOnce(mockError);

            await userController.getUserByUsername(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'error occured'});

        });
    });

    describe('testing getUsers', () => {
        it('should return a list of all users', async() => {
            const mockPagination = { page: 0, limit: 3 };
            
            pagination.mockReturnValue(mockPagination);
            getAllUsers.mockReturnValue(expectedResponse);
            contentNegotiate.mockReturnValue(true);

            await userController.getUsers(req, res);

            expect(contentNegotiate).toHaveBeenCalledWith(req, res, expectedResponse);
            
        });

        it('should return an error message when getUsers() fails', async() => {
            const mockError = new Error('Error occured');
            const mockPagination = { page: 0, limit: 3 };

            pagination.mockReturnValue(mockPagination);
            getAllUsers.mockRejectedValueOnce(mockError);

            await userController.getUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'error occured'});
        });
    });

    describe('testing updateUser', () => {
        it('should return invalid request body error message', async() => {
            const req = { body: { username: 'test' } };
            
            isRequestBodyEmpty.mockReturnValue(false);

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false, message: "Invalid request body"
            });
        });

        it('should return invalid username error message', async() => {
            const req = { body: { password: 'password' }, params: 'testuser' };

            isRequestBodyEmpty.mockReturnValue(false);
            isParamValid.mockReturnValue(false);

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "invalid username"});
        });

        it('should return an error message', async() => {
            const req = { body: { password: 'password' }, params: 'testuser' };
            const mockError = new Error('Error occured');

            isRequestBodyEmpty.mockReturnValue(false);
            isParamValid.mockReturnValue(true);
            checkPasswordLength.mockReturnValue(true);
            updateUser.mockRejectedValueOnce(mockError);

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'user update failed'});
        });

        it('should return success and user updated message', async() => {
            const req = { body: { password: 'password' }, params: 'testuser' };

            isRequestBodyEmpty.mockReturnValue(false);
            isParamValid.mockReturnValue(true);
            checkPasswordLength.mockReturnValue(true);
            convertToLowerCase.mockReturnValue(req.params);
            updateUser.mockReturnValue([1]);

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith( { success: true, data: "Password updated successfully" });
        });
    });

    describe('testing deleteUser', () => {
        it('should return invalid username error message', async() => {
            const req = { params: 'testuser' };

            isParamValid.mockReturnValue(false);

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "invalid request"});
        });

        it('should return success and user deletion message', async() => {
            const req = { params: 'testuser' };

            isParamValid.mockReturnValue(true);
            deleteUser.mockReturnValue(1);

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: "user deleted successfully"
            });
        });

        it('should return an error message', async() => {
            const req = { params: 'testuser' };
            const mockError = new Error('Error occured');

            isParamValid.mockReturnValue(true);
            deleteUser.mockRejectedValueOnce(mockError);

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({success: false, message: "user deletion failed"});
        });
    });

});
