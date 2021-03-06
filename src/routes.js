const express = require('express');
const routes = express.Router();

const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const storeController = require('./controllers/StoreController');
const profileController = require('./controllers/ProfileController');
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

routes.post('/stores', tokenMiddleware.verify, storeController.create);
routes.get('/stores', storeController.index);
routes.delete(
  '/stores/:store_id',
  tokenMiddleware.verify,
  storeMiddleware.validateOwner,
  storeController.delete
);

routes.get('/profile', tokenMiddleware.verify, profileController.index);

routes.post(
  '/stores/:store_id/products',
  tokenMiddleware.verify,
  productMiddleware.validateStoreOwner,
  productController.create
);
routes.get('/stores/:store_id/products', productController.index);
routes.delete(
  '/stores/:store_id/products/:product_id',
  tokenMiddleware.verify,
  productMiddleware.validateStoreOwner,
  productController.delete
);

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
