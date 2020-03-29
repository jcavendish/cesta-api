const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { username, password, email, whatsapp, city, uf } = request.body;

    const [id] = await connection('user').insert({
      username,
      password,
      email,
      whatsapp,
      city,
      uf,
    });

    response.json({ id });
  },
};
