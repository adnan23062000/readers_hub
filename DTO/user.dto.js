class UserDTO {
    constructor(user, showPassword=false) {
        var obj = {
          id: user["id"],
          userName: user["username"],
          email: user["email"],
          createdAt: user["createdAt"],
          updatedAt: user["updatedAt"]
        };

        if(showPassword)
        {
          obj.password = user["password"];
        }

      return obj;
    }
}

module.exports = UserDTO;
