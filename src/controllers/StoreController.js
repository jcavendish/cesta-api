const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const name = request.body.name;
    const user_id = request.user_id;
    try {
      const [id] = await connection('store').insert({
        name,
        rate: 0,
        user_id,
      });

      return response.json({ id });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('An error occurred while creating store');
    }
  },
  async index(request, response) {
    const stores = await connection('store').select('*');

    response.json(stores);
  },
  async delete(request, response) {
    const id = request.params.id;
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
