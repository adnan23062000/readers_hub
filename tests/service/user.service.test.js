const authService = require('../../service/auth.service');
const userService = require('../../service/user.service');
const userRepository = require('../../repository/user.repository');
const {  } = require('../../utils/userValidation.utils');

jest.mock('../../utils/userValidation.utils')


describe('testing user service', () => {
    
    describe('testing create user', () => {
        it('should return object of users', async() => {
            const mockUser = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password',
            };

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


    

})