const userService = require('../../service/user.service');
const userRepository = require('../../repository/user.repository');
const { convertToLowerCase } = require('../../utils/userValidation.utils');
const { calculateOffset } = require('../../utils/pagination.utils');
const { getUsersList } = require('../../utils/dtoDataList.utils');
const userDTO = require('../../DTO/user.dto');

jest.mock('../../utils/userValidation.utils');
jest.mock('../../utils/pagination.utils.js');
jest.mock('../../utils/dtoDataList.utils.js');
jest.mock('../../DTO/user.dto.js');

const mockUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
};

const mockForGet = [
{
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
},
{
    username: 'testuser3',
    email: 'testuser3@example.com',
    password: 'password3',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
},
{
    username: 'testuser4',
    email: 'testuser4@example.com',
    password: 'password2',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
},
{
    username: 'testuser5',
    email: 'testuser5@example.com',
    password: 'password2',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
},
{
    username: 'testuser6',
    email: 'testuser6@example.com',
    password: 'password2',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
}
];


describe('testing user service', () => {
    
    describe('testing create user', () => {
        it('should call userRepository.createUser() method and return an object of a user', async() => {

            const spyOnMethod = jest
                .spyOn(userRepository, 'createUser')
                .mockReturnValue(mockUser);

            const result = await userService.createUser({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
            });


            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith('testuser', 'testuser@example.com', 'password');
            expect(result).toEqual(mockUser);

        })
    }),


    describe('testing update user', () => {
        it('should call userRepository.updateUser() method and return true if user is updated', async() => {
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'updateUser')
                .mockReturnValue([1]);

            const result = await userService.updateUser('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser.username, mockUser.password);
            expect(result).toEqual([1]);
        })
    }),


    describe('testing delete user', () => {
        it('should call userRepository.deleteUser() method and return true if user is deleted', async() => {
            
            convertToLowerCase.mockImplementation((username) => {
                return mockUser.username;
            });
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'deleteUser')
                .mockReturnValue(1);


            const result = await userService.deleteUser('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser.username);
            expect(result).toEqual(1);
        })
    }),


    describe('testing get user by username', () => {
        it('should call userRepository.getUserByUsername() method and return a user object of that name', async() => {
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValue(mockForGet[0]);

            
            const { username, email, createdAt, updateAt } = mockForGet[0];
            const dtoReturnData = { username, email, createdAt, updateAt };

            userDTO.mockImplementation((user) => {
                return dtoReturnData;         
            });


            const result = await userService.getUserByUsername('testuser');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockForGet[0].username);
            expect(result).toEqual({
                username: 'testuser',
                email: 'testuser@example.com',
                createdAt: '2023-03-22T10:30:55.000Z',
                updateAt: '2023-03-28T10:57:10.000Z'
            });
        })
    }),


    describe('testing get user by username with password', () => {
        it('should call userRepository.getUserWithPassword() method and return a user object of that username with hashed password', async() => {
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValue(mockForGet[0]);

            userDTO.mockImplementation((user, showPassword) => {
                return mockForGet[0];         
            });


            const result = await userService.getUserWithPassword('testuser', true);

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockForGet[0].username);
            expect(result).toEqual({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
                createdAt: '2023-03-22T10:30:55.000Z',
                updateAt: '2023-03-28T10:57:10.000Z'
            });
        })
    }),


    describe('testing get all users', () => {
        it('should call the userRepository.getAllUsers() method and return an array of all the users', async() => {
            
            const offset = 0;
            const limit = 3;
            const dtoReturnData = mockForGet.map(obj => {
                return {
                  username: obj.username,
                  email: obj.email,
                  createdAt: obj.createdAt,
                  updateAt: obj.updateAt
                };
            });
            const dataAfterPagination = dtoReturnData.slice(offset, limit);
            
            
            calculateOffset.mockImplementation((page, limit) => {
                return offset;
            });
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'getAllUsers')
                .mockReturnValue(mockForGet);
            
            getUsersList.mockImplementation((users) => {
                return dtoReturnData.slice(offset, limit);
            })


            const result = await userService.getAllUsers(offset, limit);

            
            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(dataAfterPagination);

        })
    })
    

});