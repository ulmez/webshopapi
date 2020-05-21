/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const productCategoriesController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'productcategory', true);

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

  const getProductCategory = async (req, res) => {
    try {
      const records = await db.get(req, res, 'ProductCategory', false, [], req.params.ProductId, req.params.CategoryId);

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
      return await db.modify(req, res, 'AddProductCategory', false, [], req.params.ProductId, req.params.CategoryId);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const remove = async (req, res) => {
    try {
      return await db.modify(req, res, 'DeleteProductCategory', false, [], req.params.ProductId, req.params.CategoryId);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to delete.');
    }
  };

  return {
    get,
    getProductCategory,
    post,
    remove,
  };
};

module.exports = productCategoriesController;
