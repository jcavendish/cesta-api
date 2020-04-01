const connection = require('../database/connection');

module.exports = {
  async validateStoreOwner(request, response, next) {
    const { user_id } = request;
    const { store_id } = request.params;
    try {
      const store = await connection('store')
        .select('*')
        .where('id', store_id)
        .first();
      console.log(store);
      console.log(user_id);
      if (store.user_id !== user_id) {
        console.log(error);
        return response.status(403).send('Operation not permitted');
      }
      next();
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .send('An error occureed while vaidating the store owner');
    }
  },
};
