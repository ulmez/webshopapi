/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const reviewsController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'review', true);

      if (records.length === 0) {
        res.status(404);
        return res.send('Could not find the resource.');
      }

      return res.json(records);
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  };

  const getReview = async (req, res) => {
    try {
      const records = await db.get(req, res, 'Review', false, [], req.params.ProductId, req.params.CustomerId);
      if (records.length === 0) {
        res.status(404);
        return res.send('Could not find the resource.');
      }

      return res.json(records);
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  };

  const getReviewsByCustomerId = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ReviewsByCustomerId', false, [], req.params.CustomerId);
      if (records.length === 0) {
        res.status(404);
        return res.send('Could not find the resource.');
      }

      return res.json(records);
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  };

  const getReviewsByProductId = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ReviewsByProductId', false, [], req.params.ProductId);
      if (records.length === 0) {
        res.status(404);
        return res.send('Could not find the resource.');
      }

      return res.json(records);
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  };

  const post = async (req, res) => {
    try {
      return await db.modify(req, res, 'AddReview', true, 'ProductId', 'CustomerId', 'Review', 'Stars');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const put = async (req, res) => {
    try {
      return await db.modify(req, res, 'UpdateReview', true, 'ProductId', 'CustomerId', 'Review', 'Stars');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to update.');
    }
  };

  const remove = async (req, res) => {
    try {
      const records = await db.get(req, res, 'DeleteReview', false, [], req.params.ProductId, req.params.CustomerId);

      if (records.length === 0) {
        res.status(404);
        return res.send('Could not find the resource.');
      }

      return res.json(records);
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  };

  return {
    get,
    getReview,
    getReviewsByCustomerId,
    getReviewsByProductId,
    post,
    put,
    remove,
  };
};

module.exports = reviewsController;
