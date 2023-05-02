class UserDTO {
  constructor(user, showPassword=false) {
      var obj = {
        id: user["id"],
        userName: user["username"],
        email: user["email"],
        createdAt: new Date(user["createdAt"]).toLocaleString().replace(',', ''),
        updatedAt: new Date(user["updatedAt"]).toLocaleString().replace(',', '')
      };

      if(showPassword)
      {
        obj.password = user["password"];
      }

    return obj;
  }
}

module.exports = UserDTO;

