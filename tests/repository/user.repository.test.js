const userRepository = require('../../repository/user.repository');
const User = require('../../model/user.model');
const { mockUser } = require('../mockData');

jest.mock('../../model/user.model');

describe('User Repository unit tests', () => {

  describe('testing getAllUsers', () => {

    const offset = 0;
    const limit = 3;
    
    it('should return an array of users', async () => {
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

    it('should return an error', async() => {
      const mockError = new Error('error occured');
      const offset = 0;
      const limit = 3;

      jest
        .spyOn(User, 'findAll')
        .mockReturnValueOnce(mockError);

      const result = await userRepository.getAllUsers(offset, limit);
      expect(result).toBe(mockError);
    });

  });

  describe('testing getUserByUsername', () => {
    
    const username = 'testuser';
    
    it('should return a user object for a valid username', async () => {
      const spyOnMethod = jest
        .spyOn(User, 'findOne')
        .mockResolvedValueOnce(mockUser[0]);
      
      const result = await userRepository.getUserByUsername(username);
      
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
      const mockError = new Error('error occured');

      jest
        .spyOn(User, 'findOne')
        .mockReturnValueOnce(mockError);

      const result = await userRepository.getUserByUsername(username);
      expect(result).toBe(mockError);
    });
  });

  describe('testing createUser', () => {
    
    const username = 'testuser';
    const email = 'testuser@example.com';
    const password = 'password';
    
    it('should create a new user', async () => {
      const spyOnMethod = jest
        .spyOn(User, 'create')
        .mockResolvedValueOnce(mockUser[0]);
      
      const result = await userRepository.createUser(username, email, password);

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

    it('should return an error', async() => {
      const mockError = new Error('error occured');

      jest
        .spyOn(User, 'create')
        .mockReturnValueOnce(mockError);

      const result = await userRepository.createUser(username, email, password);
      expect(result).toBe(mockError);
    });
  });

  describe('testing updateUser', () => {
    
    const username = 'testuser';
    const newPassword = 'newpassword';

    it('should update the user password for a valid username', async () => {
      const spyOnUpdate = jest
        .spyOn(User, 'update')
        .mockResolvedValueOnce([1]);
      
      const result = await userRepository.updateUser(username, newPassword);
      
      expect(result).toEqual([1]);
      expect(spyOnUpdate).toHaveBeenCalledTimes(1);
      expect(spyOnUpdate).toHaveBeenCalledWith(
        { password: 'newpassword' },
        { where: { username: 'testuser' }, individualHooks: true }, 
      );
    });

    it('should return an error', async() => {
      const mockError = new Error('error occured');

      jest
        .spyOn(User, 'update')
        .mockReturnValueOnce(mockError);

      const result = await userRepository.updateUser(username, newPassword);
      expect(result).toBe(mockError);
    });
  });

  describe('testing deleteUser', () => {
    
    const username = 'testuser';

    it('should delete the user for a valid username', async () => {
      const spyOnDestroy = jest.spyOn(User, 'destroy').mockResolvedValueOnce(1);
      
      const result = await userRepository.deleteUser(username);
      
      expect(result).toEqual(1);
      expect(spyOnDestroy).toHaveBeenCalledTimes(1);
      expect(spyOnDestroy).toHaveBeenCalledWith({
        where: {
          username,
        },
      });
    });

    it('should return an error', async() => {
      const mockError = new Error('error occured');

      jest
        .spyOn(User, 'destroy')
        .mockReturnValueOnce(mockError);

      const result = await userRepository.deleteUser(username);
      expect(result).toBe(mockError);
    });
  });

});
