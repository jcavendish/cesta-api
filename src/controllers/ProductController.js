const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, description, value, measure, store_id } = request.body;
    const token = request.headers['authorization'];
    const [id] = await connection('store').insert({
      name,
      description,
      value,
      measure,
      store_id,
    });

    response.json({ id });
  },
  async index(request, response) {
    const token = request.headers['authorization'];
    const products = await connection('product')
      .select('*')
      .where('store_id', 'xxx');

    response.json(stores);
  },
  async delete(request, response) {
    await connection('product').del().where('id', request.body.id);

    response.status(204).send();
  },
  async update(request, response) {
    const { id, name, description, value, measure } = request.body;

    await connection('store').where('id', id).update({
      name,
      description,
      value,
      measure,
      store_id,
    });

    response.json({ id });
  },
};
