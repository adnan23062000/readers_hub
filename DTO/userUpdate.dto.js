class UserUpdateDTO {
    
    constructor(user) {
      
      this.users = [];
        
        var obj = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
        this.users.push(obj);
      }

}

module.exports = UserUpdateDTO;