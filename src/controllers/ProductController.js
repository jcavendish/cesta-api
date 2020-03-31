const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name, description, value, measure } = request.body;
    const { store_id } = request.params;

    const [id] = await connection('product').insert({
      name,
      description,
      value,
      measure,
      store_id,
    });

    response.json({ id });
  },
  async index(request, response) {
    const store_id = request.params.id;
    try {
      const products = await connection('product')
        .select('*')
        .where('store_id', store_id);

      return response.json(products);
    } catch (error) {
      console.log(error);
    }
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
