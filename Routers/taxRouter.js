const express = require('express');
const taxesController = require('../Controllers/taxesController');

function routes() {
  const taxRouter = express.Router();
  const controller = taxesController();

  taxRouter.route('/taxs')
    .get(controller.get)
    .post(controller.post);

  taxRouter.route('/taxs/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return taxRouter;
}

module.exports = routes;
