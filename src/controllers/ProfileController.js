const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { user_id } = request;
    try {
      const stores = await connection('store').select('*').where({ user_id });

      return response.json(stores);
    } catch (error) {
      console.log(error);
    }
  },
};
