/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const favoritesController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'favorite', false);

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

  const getCount = async (req, res) => {
    try {
      const records = await db.get(req, res, 'favoritesCount', false, [], req.params.CustomerId);

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
      return await db.modify(req, res, 'AddFavorite', false, req.params.CustomerId, req.params.ProductId);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const remove = async (req, res) => {
    try {
      return await db.modify(req, res, 'DeleteFavorite', false, req.params.CustomerId, req.params.ProductId);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to delete.');
    }
  };

  return {
    get,
    getCount,
    post,
    remove,
  };
};

module.exports = favoritesController;
