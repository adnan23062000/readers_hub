const userService = require('../../service/user.service');
const userRepository = require('../../repository/user.repository');
const { convertToLowerCase } = require('../../utils/userValidation.utils');
const { calculateOffset } = require('../../utils/pagination.utils');
const { getUsersList } = require('../../utils/dtoDataList.utils');
const userDTO = require('../../DTO/user.dto');
const { mockUser } = require('../mockData');

jest.mock('../../utils/userValidation.utils');
jest.mock('../../utils/pagination.utils.js');
jest.mock('../../utils/dtoDataList.utils.js');
jest.mock('../../DTO/user.dto.js');


describe('testing user service', () => {
    
    describe('testing create user', () => {
        it('should call userRepository.createUser() method and return an object of a user', async() => {

            const mockData = mockUser[0];
            const spyOnMethod = jest
                .spyOn(userRepository, 'createUser')
                .mockReturnValue({ username: mockData.username, email: mockData.email, password: mockData.password });

            const result = await userService.createUser({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
            });


            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith('testuser', 'testuser@example.com', 'password');
            expect(result).toEqual({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password'
            });
        });
    }),


    describe('testing update user', () => {
        it('should call userRepository.updateUser() method and return true if user is updated', async() => {
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'updateUser')
                .mockReturnValue([1]);

            const result = await userService.updateUser('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser[0].username, mockUser[0].password);
            expect(result).toEqual([1]);
        })
    }),


    describe('testing delete user', () => {
        it('should call userRepository.deleteUser() method and return true if user is deleted', async() => {
            
            convertToLowerCase.mockImplementation((username) => {
                return mockUser[0].username;
            });
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'deleteUser')
                .mockReturnValue(1);


            const result = await userService.deleteUser('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser[0].username);
            expect(result).toEqual(1);
        })
    }),


    describe('testing get user by username', () => {
        it('should call userRepository.getUserByUsername() method and return a user object of that name', async() => {
            
            const spyOnMethod = jest
                .spyOn(userRepository, 'getUserByUsername')
                .mockReturnValue(mockUser[0]);

            
            const { username, email, createdAt, updateAt } = mockUser[0];
            const dtoReturnData = { username, email, createdAt, updateAt };

            userDTO.mockImplementation((user) => {
                return dtoReturnData;         
            });


            const result = await userService.getUserByUsername('testuser');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser[0].username);
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
                .mockReturnValue(mockUser[0]);

            userDTO.mockImplementation((user, showPassword) => {
                return mockUser[0];         
            });


            const result = await userService.getUserWithPassword('testuser', true);

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockUser[0].username);
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
            const dtoReturnData = mockUser.map(obj => {
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
                .mockReturnValue(mockUser);
            
            getUsersList.mockImplementation((users) => {
                return dtoReturnData.slice(offset, limit);
            })


            const result = await userService.getAllUsers(offset, limit);

            
            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(dataAfterPagination);

        })
    })
    

});