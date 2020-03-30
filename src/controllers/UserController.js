const connection = require('../database/connection');
var bcrypt = require('bcryptjs');

module.exports = {
  async create(request, response) {
    const { username, password, email, whatsapp, city, uf } = request.body;
    const hashPass = bcrypt.hashSync(password);

    try {
      const [id] = await connection('user').insert({
        username,
        password: hashPass,
        email,
        whatsapp,
        city,
        uf,
      });
      return response.json({ id });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('Error occured while creating a new user');
    }
  },
  async index(request, response) {
    try {
      const users = await connection('user').select('*');
      return response.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};
