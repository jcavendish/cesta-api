const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const cart_id = request.params.id;
    const { amount, product_id } = request.body;
    try {
      const [id] = await connection('cart_product').insert({
        amount,
        cart_id,
        product_id,
      });
      return response.json({ id });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('Error occured while adding item to cart');
    }
  },
  async index(request, response) {
    const cart_id = request.params.id;
    try {
      const cart_products = await connection('cart_product').select('*').where({
        cart_id,
      });

      return response.json(cart_products);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(request, response) {
    const { cart_id, product_id } = request.params;

    try {
      await connection('cart_product').del().where({
        cart_id,
        product_id,
      });

      return response.sendStatus(204);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('An error occurred while deleting the product from your cart');
    }
  },
};
