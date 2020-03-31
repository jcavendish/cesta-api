const express = require('express');
const routes = express.Router();

const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const storeController = require('./controllers/StoreController');
const cartController = require('./controllers/CartController');
const productController = require('./controllers/ProductController');
const cartProductController = require('./controllers/CartProductController');

const tokenMiddleware = require('./middlewares/TokenMiddleware');
const cartMiddleware = require('./middlewares/CartMiddleware');
const cartProductMiddleware = require('./middlewares/CartProductMiddleware');
const storeMiddleware = require('./middlewares/StoreMiddleware');
const productMiddleware = require('./middlewares/ProductMiddleware');

routes.post('/users', userController.create);
routes.get('/users', userController.index);

routes.post('/sessions', sessionController.create);

routes.post(
  '/stores',
  tokenMiddleware.verify,
  storeMiddleware.validateOwner,
  storeController.create
);
routes.get('/stores', storeController.index);

routes.post(
  '/stores/:store_id/products',
  tokenMiddleware.verify,
  productMiddleware.validateStoreOwner,
  productController.create
);
routes.get('/stores/:store_id/products', productController.index);

routes.post(
  '/stores/:id/carts',
  tokenMiddleware.verify,
  cartMiddleware.validateRegistration,
  cartController.create
);
routes.get('/stores/:id/carts', tokenMiddleware.verify, cartController.index);

routes.post(
  '/carts/:id/products',
  tokenMiddleware.verify,
  cartProductController.create
);
routes.get(
  '/carts/:id/products',
  tokenMiddleware.verify,
  cartProductController.index
);
routes.delete(
  '/carts/:cart_id/products/:product_id',
  tokenMiddleware.verify,
  cartProductMiddleware.validateClient,
  cartProductController.delete
);

module.exports = routes;
