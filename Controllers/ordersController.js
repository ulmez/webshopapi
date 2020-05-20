/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const db = require('../db');

const ordersController = () => {
  const get = async (req, res) => {
    try {
      const records = await db.get(req, res, 'order', true);

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

  const getOrderByOrderNumber = async (req, res) => {
    try {
      const records = await db.get(req, res, 'OrderByOrderNumber', false, [], req.params.OrderNumber);
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

  const getOrdersByCustomerId = async (req, res) => {
    try {
      const records = await db.get(req, res, 'OrdersByCustomerId', false, [], req.params.CustomerId);
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
      return await db.modify(req, res, 'AddOrder', true, 'CustomerId', 'OrderNumber', 'ShippingAddressId', 'InvoiceAddressId', 'PurchaseDate', 'StatusId', 'Total', 'ShippingMethodId', 'PaymentMethodId', 'PaymentInformation', 'Discount', 'Tax', 'PromoCodeId');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to create.');
    }
  };

  const put = async (req, res) => {
    try {
      return await db.modify(req, res, 'UpdateOrder', true, 'CustomerId', 'OrderNumber', 'ShippingAddressId', 'InvoiceAddressId', 'PurchaseDate', 'StatusId', 'Total', 'ShippingMethodId', 'PaymentMethodId', 'PaymentInformation', 'Discount', 'Tax', 'PromoCodeId');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to update.');
    }
  };

  const remove = async (req, res) => {
    try {
      return await db.modify(req, res, 'DeleteOrder', true);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send('Unable to delete.');
    }
  };

  return {
    get,
    getOrderByOrderNumber,
    getOrdersByCustomerId,
    post,
    put,
    remove,
  };
};

module.exports = ordersController;
