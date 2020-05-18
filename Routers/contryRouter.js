const express = require('express');
const countriesController = require('../Controllers/countriesController');

function routes() {
  const countryRouter = express.Router();
  const controller = countriesController();

  countryRouter.route('/countrys')
    .get(controller.get)
    .post(controller.post);

  countryRouter.route('/countrys/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove);

  return countryRouter;
}

module.exports = routes;
