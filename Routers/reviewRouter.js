const express = require('express');
const reviewsController = require('../Controllers/reviewsController');

function routes() {
  const reviewRouter = express.Router();
  const controller = reviewsController();

  reviewRouter.route('/reviews')
    .get(controller.get)
    .post(controller.post)
    .put(controller.put);

  reviewRouter.route('/review/:ProductId/:CustomerId')
    .get(controller.getReview)
    .delete(controller.remove);

  reviewRouter.route('/deletereview/:ProductId/:CustomerId')
    .get(controller.remove);

  reviewRouter.route('/reviewsbycustomerid/:CustomerId')
    .get(controller.getReviewsByCustomerId);

  reviewRouter.route('/reviewsbyproductid/:ProductId')
    .get(controller.getReviewsByProductId);

  return reviewRouter;
}

module.exports = routes;
