const userRepository = require('../../repository/user.repository');
const User = require('../../model/user.model');

const mockUser = [{
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



describe('User Repository', () => {

  describe('testing getAllUsers', () => {
    it('should return an array of users', async () => {
      
        const page=0;
        const offset=3;
      
        const spyOnMethod = jest.spyOn(User, 'findAll').mockImplementation(({ page, limit }) =>
            mockUser.slice(page, limit)
        );

        const result = await userRepository.getAllUsers(page, offset);
        expect(result).toEqual(mockUser.slice(page, offset));
        expect(result.length).toBe(3);
        expect(spyOnMethod).toHaveBeenCalledTimes(1);
      
    });
  });

  describe('testing getUserByUsername', () => {
    it('should return a user object for a valid username', async () => {
      const spyOnMethod = jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUser[0]);
      const result = await userRepository.getUserByUsername('testuser');
      expect(result).toEqual(mockUser[0]);
      expect(spyOnMethod).toHaveBeenCalledTimes(1);
    });
  });

  describe('testing createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser[0]);
      const result = await userRepository.createUser('testuser', 'testuser@example.com', 'password');
      expect(result).toEqual(mockUser[0]);
    });
  });

  describe('testing updateUser', () => {
    it('should update the user password for a valid username', async () => {
      jest.spyOn(User, 'update').mockResolvedValueOnce([1]);
      const result = await userRepository.updateUser('testuser', 'newpassword');
      expect(result).toEqual([1]);
    });
  });

  describe('testing deleteUser', () => {
    it('should delete the user for a valid username', async () => {
      jest.spyOn(User, 'destroy').mockResolvedValueOnce(1);
      const result = await userRepository.deleteUser('testuser');
      expect(result).toEqual(1);
    });
  });

});
