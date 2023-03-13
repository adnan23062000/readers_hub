class UserDTO {
    constructor(user) {
      
      this.users = [];
        
      
        
        var obj = {
          id: user["id"],
          userName: user["username"],
          email: user["email"],
          createdAt: user["createdAt"],
          updatedAt: user["updatedAt"]
        };

        return obj;
        

    }
}

module.exports = UserDTO;
