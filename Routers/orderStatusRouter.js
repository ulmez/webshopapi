const express = require('express');
const orderStatusesController = require('../Controllers/orderStatusesController');

function routes() {
  const orderStatusRouter = express.Router();
  const controller = orderStatusesController();

  orderStatusRouter.route('/orderstatus')
    .get(controller.get)
    .post(controller.post);

  orderStatusRouter.route('/orderstatus/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return orderStatusRouter;
}

module.exports = routes;
