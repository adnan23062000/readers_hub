const userRepository = require('../../repository/user.repository');
const User = require('../../model/user.model');
const { mockUser } = require('../mockData');

jest.mock('../../model/user.model');

describe('User Repository unit tests', () => {

  describe('testing getAllUsers', () => {

    it('should return an array of users', async () => {
      const offset = 0;
      const limit = 3;
      const spyOnMethod = jest
        .spyOn(User, 'findAll')
        .mockImplementation(({ offset, limit }) => mockUser.slice(offset, limit));
      
      const result = await userRepository.getAllUsers(offset, limit);

      expect(result).toEqual(mockUser.slice(offset, limit));
      expect(result.length).toBe(3);
      expect(spyOnMethod).toHaveBeenCalledTimes(1);
      expect(spyOnMethod).toHaveBeenCalledWith({ offset, limit });
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            createdAt: expect.any(String),
            updateAt: expect.any(String),
          }),
        ])
      );
    });

  });

  describe('testing getUserByUsername', () => {
    it('should return a user object for a valid username', async () => {
      const spyOnMethod = jest
        .spyOn(User, 'findOne')
        .mockResolvedValueOnce(mockUser[0]);
      
      const result = await userRepository.getUserByUsername('testuser');
      
      expect(result).toEqual(mockUser[0]);
      expect(spyOnMethod).toHaveBeenCalledTimes(1);
      expect(spyOnMethod).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(result).toEqual(
        expect.objectContaining({
          username: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(String),
          updateAt: expect.any(String),
        })
      );
    });

    it('should return an error', async() => {
      const err = new Error('error occured');
      // User.findOne.mockRejectedValue(error);
      jest
        .spyOn(User, 'findOne')
        .mockReturnValueOnce( err);

      const result = await userRepository.getUserByUsername('testuser');

      expect(result).toBe(err);
    });
  });

  describe('testing createUser', () => {
    it('should create a new user', async () => {
      const spyOnMethod = jest
        .spyOn(User, 'create')
        .mockResolvedValueOnce(mockUser[0]);
      
      const result = await userRepository.createUser(
        'testuser',
        'testuser@example.com',
        'password'
      );

      expect(spyOnMethod).toHaveBeenCalledTimes(1);
      expect(spyOnMethod).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      });
      expect(result).toEqual(mockUser[0]);
      expect(result).toEqual(
        expect.objectContaining({
          username: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(String),
          updateAt: expect.any(String),
        })
      );
    });
  });

  describe('testing updateUser', () => {
    it('should update the user password for a valid username', async () => {
      const spyOnUpdate = jest
        .spyOn(User, 'update')
        .mockResolvedValueOnce([1]);
      
      const result = await userRepository.updateUser('testuser', 'newpassword');
      
      expect(result).toEqual([1]);
      expect(spyOnUpdate).toHaveBeenCalledTimes(1);
      expect(spyOnUpdate).toHaveBeenCalledWith(
        { password: 'newpassword' },
        { where: { username: 'testuser' }, individualHooks: true }, 
      );
    });
  });

  describe('testing deleteUser', () => {
    it('should delete the user for a valid username', async () => {
      const spyOnDestroy = jest.spyOn(User, 'destroy').mockResolvedValueOnce(1);
      
      const username = 'testuser';
      const result = await userRepository.deleteUser(username);
      
      expect(result).toEqual(1);
      expect(spyOnDestroy).toHaveBeenCalledTimes(1);
      expect(spyOnDestroy).toHaveBeenCalledWith({
        where: {
          username,
        },
      });
    });
  });


});
