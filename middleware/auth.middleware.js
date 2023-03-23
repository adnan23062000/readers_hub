const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).json({
      success: 0,
      message: 'jwt authorization failed',
    });
  }

  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    return res.status(401).send(e);
  }

  return null;
};
