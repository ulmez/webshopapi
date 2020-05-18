const express = require('express');
const addressesController = require('../Controllers/addressesController');

function routes() {
  const addressRouter = express.Router();
  const controller = addressesController();

  addressRouter.route('/addresss')
    .get(controller.get)
    .post(controller.post);

  addressRouter.route('/addresss/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return addressRouter;
}

module.exports = routes;
