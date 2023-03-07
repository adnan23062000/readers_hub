class UserDTO {
    constructor(user) {
      
      this.users = [];
        
      for (var i = 0; i < user.length; i++) {
        var obj = {
          id: user[i]["Id"],
          userName: user[i]["Username"],
          email: user[i]["Email"],
          createdAt: user[i]["CreatedAt"],
          updatedAt: user[i]["UpdatedAt"]
        };
        this.users.push(obj);
      }
    }
}

module.exports = UserDTO;
