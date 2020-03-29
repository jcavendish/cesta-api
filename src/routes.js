const express = require('express');
const routes = express.Router();

const storeController = require('./controllers/StoreController');

routes.post('/stores', storeController.create);
routes.get('/stores', storeController.index);

module.exports = routes;
