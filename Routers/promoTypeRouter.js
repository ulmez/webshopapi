const express = require('express');
const promoTypesController = require('../Controllers/promoTypesController');

function routes() {
  const promoTypeRouter = express.Router();
  const controller = promoTypesController();

  promoTypeRouter.route('/promotypes')
    .get(controller.get)
    .post(controller.post);

  promoTypeRouter.route('/promotypes/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return promoTypeRouter;
}

module.exports = routes;
