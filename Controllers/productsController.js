/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const productsController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'product', true);

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

  const getProductsByBrandId = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ProductsByBrandId', false, [], req.params.BrandId);
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

  const getProductsByGreaterThanOrEqualStars = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ProductsByGreaterThanOrEqualStars', false, [], req.params.Stars);
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

  const getProductsByLessThanOrEqualStars = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ProductsByLessThanOrEqualStars', false, [], req.params.Stars);
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
      return await db.modify(req, res, 'AddProduct', true, 'BrandId', 'Product', 'Price', 'PercentOff', 'Description', 'IsFeatured', 'Stars', 'TaxId');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const put = async (req, res) => {
    try {
      return await db.modify(req, res, 'UpdateProduct', true, 'BrandId', 'Product', 'Price', 'PercentOff', 'Description', 'IsFeatured', 'Stars', 'TaxId');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to update.');
    }
  };

  const remove = async (req, res) => {
    try {
      return await db.modify(req, res, 'DeleteProduct', true);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to delete.');
    }
  };

  return {
    get,
    getProductsByBrandId,
    getProductsByGreaterThanOrEqualStars,
    getProductsByLessThanOrEqualStars,
    post,
    put,
    remove,
  };
};

module.exports = productsController;
