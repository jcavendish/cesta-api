const connection = require('../database/connection');

module.exports = {
  async validateClient(request, response, next) {
    const { cart_id } = request.params;
    const { user_id } = request;
    try {
      const entity = await connection('cart')
        .join('store', 'cart.store_id', 'store.id')
        .join('user', 'store.user_id', 'user.id')
        .select('*')
        .where('cart.id', cart_id)
        .first();

      if (entity && entity.user_id !== user_id) {
        return response.status(403).send('Opperation not prmitted');
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
