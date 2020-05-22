/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const cartProductsController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'cartproduct', true);

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

  const getCartProduct = async (req, res) => {
    try {
      const records = await db.get(req, res, 'CartProduct', false, [], req.params.CustomerId, req.params.ProductId);

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

  const getCartProductsByCustomerId = async (req, res) => {
    try {
      const records = await db.get(req, res, 'CartProductsByCustomerId', false, [], req.params.CustomerId);

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
      return await db.modify(req, res, 'AddCartProduct', true, 'CustomerId', 'ProductId', 'Count');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const put = async (req, res) => {
    try {
      return await db.modify(req, res, 'UpdateCartProduct', true, 'CustomerId', 'ProductId', 'Count');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to update.');
    }
  };

  const remove = async (req, res) => {
    try {
      const records = await db.get(req, res, 'DeleteCartProduct', false, [], req.params.CustomerId, req.params.ProductId);

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
    getCartProduct,
    getCartProductsByCustomerId,
    post,
    put,
    remove,
  };
};

module.exports = cartProductsController;
