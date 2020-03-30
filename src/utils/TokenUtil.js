var jwt = require('jsonwebtoken');

module.exports = {
  create(user) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        whatsapp: user.whatsapp,
      },
      process.env.SECRET_API,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );
  },
};
