const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

const tokenUtils = require('../utils/TokenUtil');

module.exports = {
  async create(request, response) {
    const { username, password } = request.body;

    try {
      const user = await connection('user')
        .select('*')
        .where('username', username)
        .first();

      if (!bcrypt.compareSync(password, user.password)) {
        return response.status(403).send('Password missmatch');
      }

      const token = tokenUtils.create(user);

      return response
        .status(200)
        .set('Authorization', token)
        .send({ auth: true });
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error when trying to login');
    }
  },
};
