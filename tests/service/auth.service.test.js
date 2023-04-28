const authService = require('../../service/auth.service');
const userService = require('../../service/user.service');
const { generateAccessToken, compareHashedPassword } = require('../../utils/userValidation.utils');
const { mockUser } = require('../mockData');

jest.mock('../../utils/userValidation.utils')


describe('testing auth service', () => {

    describe('testing user register', () => {
        it('should throw an error from the userService.createUser() method', async() => {
            const mockError = new Error('An error occurred');
        
            const spyOnMethod = jest
                .spyOn(userService, 'createUser')
                .mockReturnValue(mockError);
            
            try {
                await authService.registerUser({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
            } catch (error) {
                expect(spyOnMethod).toHaveBeenCalledTimes(1);
                expect(error).toBe(mockError);
            }
        });
        
        it('should return an error from generateAccessToken() method', async() => {
            const mockError = new Error('An error occurred');
        
            const spyOnMethod = jest
                .spyOn(userService, 'createUser')
                .mockReturnValue(mockUser[0]);
            
            generateAccessToken.mockReturnValue(mockError);

            const result = await authService.registerUser({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
            console.log(result);

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockError);  
        });

        it('should return an access token to the newly registered user', async() => {
            const mockAccessToken = 'testToken';

            const spyOnMethod = jest
                .spyOn(userService, 'createUser')
                .mockReturnValue(mockUser[0]);
            
            generateAccessToken.mockImplementation((username) => {
                return mockAccessToken;
            });
             
            const result = await authService.registerUser({ username: 'testuser', email: 'testuser@example.com', password: 'password' });

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockAccessToken);
        });
    }),

    describe('testing user login', () => {
        it('should return an access token to the newly registered user', async() => {
            const mockAccessToken = 'testToken';

            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(mockUser[0]);
            
            compareHashedPassword.mockImplementation((givenName, username) => {
                return mockAccessToken;
            });

            const result = await authService.userLogin('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockAccessToken);
        });

        it('should throw an error from userService.getUserWithPassword() method', async() => {
            const mockError = 'An Error occured';

            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(mockError);

            try {
                await authService.userLogin('testuser', 'password');
            } catch (error) {
                expect(spyOnMethod).toHaveBeenCalledTimes(1);
                expect(error).toBe(mockError);
            }
        });

        it('should return user not found error', async() => {
            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(null);

            try {
                await authService.userLogin('testuser', 'password');
            } catch (error) {
                expect(spyOnMethod).toHaveBeenCalledTimes(1);
                expect(error).toEqual(new Error('User not found'));
            }
        });

        it('should return Incorrect Password error', async() => {
            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(mockUser[0]);

            compareHashedPassword.mockReturnValue(false);

            try {
                await authService.userLogin('testuser', 'password');
            } catch (error) {
                expect(spyOnMethod).toHaveBeenCalledTimes(1);
                expect(error).toEqual(new Error('Incorrect Password'));
            }
        });

        it('should throw an error from generateAccessToken() method', async() => {
            const mockAccessToken = 'testToken';
            const mockError = 'An error occured';

            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(mockUser[0]);
            
            compareHashedPassword.mockImplementation((givenName, username) => {
                return mockAccessToken;
            });

            generateAccessToken.mockReturnValue(mockError);

            const result = await authService.userLogin('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockError);
        });
    })

});