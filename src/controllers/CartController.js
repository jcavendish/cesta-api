const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const store_id = request.params.id;
    const user_id = request.user_id;
    try {
      const [id] = await connection('cart').insert({
        total: 0,
        user_id,
        store_id,
      });
      return response.json({ id });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('Error occured while creating user cart');
    }
  },
  async index(request, response) {
    const store_id = request.params.id;
    const user_id = request.user_id;
    try {
      const cart = await connection('cart')
        .select('*')
        .where({
          store_id,
          user_id,
        })
        .first();
      return response.json(cart);
    } catch (error) {
      console.log(error);
    }
  },
};
