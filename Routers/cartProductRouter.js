const express = require('express');
const cartProductsController = require('../Controllers/cartProductsController');

function routes() {
  const cartProductRouter = express.Router();
  const controller = cartProductsController();

  cartProductRouter.route('/cartproducts')
    .get(controller.get)
    .post(controller.post)
    .put(controller.put);

  cartProductRouter.route('/cartproduct/:CustomerId/:ProductId')
    .get(controller.getCartProduct);

  cartProductRouter.route('/cartproductdelete/:CustomerId/:ProductId')
    .get(controller.remove);

  cartProductRouter.route('/cartproduct/:CustomerId')
    .get(controller.getCartProductsByCustomerId);

  cartProductRouter.route('/cartproducts/:Id')
    .get(controller.get);

  return cartProductRouter;
}

module.exports = routes;
