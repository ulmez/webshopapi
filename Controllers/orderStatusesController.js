/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const orderStatusesController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'orderstatus', true);

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
      return await db.modify(req, res, 'AddOrderStatus', true, 'Status');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const put = async (req, res) => {
    try {
      return await db.modify(req, res, 'UpdateOrderStatus', true, 'Status');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to update.');
    }
  };

  const remove = async (req, res) => {
    try {
      return await db.modify(req, res, 'DeleteOrderStatus', true);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to delete.');
    }
  };

  return {
    get,
    post,
    put,
    remove,
  };
};

module.exports = orderStatusesController;
