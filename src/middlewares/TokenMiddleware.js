var jwt = require('jsonwebtoken');

module.exports = {
  verify(request, response, next) {
    var token = request.headers['authorization'];
    if (!token) {
      response.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
      if (err)
        return response
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      request.user_id = decoded.id;
      next();
    });
  },
};
