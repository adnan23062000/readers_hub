const authService = require('../service/auth.service');
const { compareHashedPassword, generateAccessToken } = require('../utils/user.utils');

module.exports = {

  userRegister: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No request body',
      });
    }

    const { body } = req;
    const { username } = req.body;

    if (!body.username || !body.email || !body.password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
      });
    }

    try {
      const data = await authService.registerUser(body);

      if (data) {
        const accessToken = generateAccessToken(username);

        res.cookie('jwt', accessToken, { httpOnly: true });

        return res.status(201).json({
          success: true,
          data: 'user created',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'User creation failed',
      });
    }

    return null;
  },

  userLogin: async (req, res) => {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Empty request body',
      });
    }

    const { username } = req.body;
    const { password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid request',
      });
    }

    const user = await authService.userLogin(username);

    const passwordMatched = await compareHashedPassword(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password',
      });
    }

    const accessToken = generateAccessToken(username);

    res.cookie('jwt', accessToken, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: 'user logged in',
    });

    return null;
  },

};
