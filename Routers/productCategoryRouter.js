const express = require('express');
const productCategoriesController = require('../Controllers/productCategoriesController');

function routes() {
  const productCategoryRouter = express.Router();
  const controller = productCategoriesController();

  productCategoryRouter.route('/productcategorys')
    .get(controller.get);

  productCategoryRouter.route('/productcategory/:ProductId/:CategoryId')
    .get(controller.getProductCategory)
    .post(controller.post)
    .delete(controller.remove);

  //   productCategoryRouter.route('/productcategorys/:Id')
  //     .get(controller.get)
  //     .put(controller.put)
  //     .delete(controller.remove);

  return productCategoryRouter;
}

module.exports = routes;
