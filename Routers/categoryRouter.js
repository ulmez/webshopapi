const express = require('express');
const categoriesController = require('../Controllers/categoriesController');

function routes() {
  const categoryRouter = express.Router();
  const controller = categoriesController();

  categoryRouter.route('/categorys')
    .get(controller.get)
    .post(controller.post);

  categoryRouter.route('/categorys/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return categoryRouter;
}

module.exports = routes;
