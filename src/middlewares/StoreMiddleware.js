const connection = require('../database/connection');

module.exports = {
  async validateOwner(request, response, next) {
    const { user_id } = request;
    const { id } = request.params;
    try {
      const store = await connection('store').select('*').where('id', id);

      if (store.user_id !== user_id) {
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
