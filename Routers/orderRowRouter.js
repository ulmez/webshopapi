const express = require('express');
const orderRowsController = require('../Controllers/orderRowsController');

function routes() {
  const orderRowRouter = express.Router();
  const controller = orderRowsController();

  orderRowRouter.route('/orderrows')
    .get(controller.get)
    .post(controller.post);

  orderRowRouter.route('/orderrows/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return orderRowRouter;
}

module.exports = routes;
