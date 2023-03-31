const authService = require('../../service/auth.service');
const userService = require('../../service/user.service');
const { generateAccessToken, compareHashedPassword } = require('../../utils/userValidation.utils');

jest.mock('../../utils/userValidation.utils')


describe('testing auth service', () => {

    describe('testing user register', () => {
        it('should return an access token to the newly registered user', async() => {
            
            const mockUser = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
              };
            const mockAccessToken = 'testToken';

            generateAccessToken.mockImplementation((username) => {
                return mockAccessToken;
            });
            
            const spyOnMethod = jest
                .spyOn(userService, 'createUser')
                .mockReturnValue(mockAccessToken);
            
            
            const result = await authService.registerUser({ username: 'testuser', email: 'testuser@example.com', password: 'password' });

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockAccessToken);


        })
    }),


    describe('testing user login', () => {
        it('should return an access token to the newly registered user', async() => {
            
            const mockUser = {
                username: 'testuser',
                password: 'password',
            };
            const mockAccessToken = 'testToken';

            compareHashedPassword.mockImplementation((givenName, username) => {
                return mockAccessToken;
            });

            const spyOnMethod = jest
                .spyOn(userService, 'getUserWithPassword')
                .mockReturnValue(mockAccessToken);

            const result = await authService.userLogin('testuser', 'password');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockAccessToken);

        })
    })


});