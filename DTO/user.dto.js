class UserDTO {
  constructor(user, showPassword = false) {
    Object.assign(this, {
      id: user.id,
      userName: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    if (showPassword) {
      this.password = user.password;
    }
  }
}

module.exports = UserDTO;
