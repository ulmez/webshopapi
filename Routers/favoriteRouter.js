const express = require('express');
const favoritesController = require('../Controllers/favoritesController');

function routes() {
  const favoriteRouter = express.Router();
  const controller = favoritesController();

  favoriteRouter.route('/favorites/:CustomerId')
    .get(controller.get);

  favoriteRouter.route('/favorites/:CustomerId/:ProductId')
    .get(controller.get)
    .post(controller.post)
    .delete(controller.remove);

  return favoriteRouter;
}

module.exports = routes;
