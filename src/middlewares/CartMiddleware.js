const connection = require('../database/connection');

module.exports = {
  async validateRegistration(request, response, next) {
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
      if (cart) {
        return response
          .status(400)
          .send('You are already registered to this store');
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
