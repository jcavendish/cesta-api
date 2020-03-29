const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const [id] = await connection('store').insert({
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    response.json({ id });
  },
  async index(request, response) {
    const stores = await connection('store').select('*');

    response.json(stores);
  },
  async delete(request, response) {
    const id = request.param.id;
    await connection('store').del().where('id', id);

    response.status(204).send();
  },
  async update(request, response) {
    const { id, name, email, whatsapp, city, uf } = request.body;
    await connection('store').where('id', id).update({
      name,
      email,
      whatsapp,
      city,
      uf,
    });
    response.json({ id });
  },
};
