const express = require('express');
const paymentMethodsController = require('../Controllers/paymentMethodsController');

function routes() {
  const paymentMethodRouter = express.Router();
  const controller = paymentMethodsController();

  paymentMethodRouter.route('/paymentmethods')
    .get(controller.get)
    .post(controller.post);

  paymentMethodRouter.route('/paymentmethods/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return paymentMethodRouter;
}

module.exports = routes;
