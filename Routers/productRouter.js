const express = require('express');
const productsController = require('../Controllers/productsController');

function routes() {
  const productRouter = express.Router();
  const controller = productsController();

  productRouter.route('/products')
    .get(controller.get)
    .post(controller.post);

  productRouter.route('/productsbybrandid/:BrandId')
    .get(controller.getProductsByBrandId);

  productRouter.route('/productsbygreaterthanorequalstars/:Stars')
    .get(controller.getProductsByGreaterThanOrEqualStars);

  productRouter.route('/productsbylessthanorequalstars/:Stars')
    .get(controller.getProductsByLessThanOrEqualStars);

  productRouter.route('/products/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return productRouter;
}

module.exports = routes;
