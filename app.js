/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const countryRouter = require('./Routers/contryRouter')();
const brandRouter = require('./Routers/brandRouter')();
const categoryRouter = require('./Routers/categoryRouter')();
const addressRouter = require('./Routers/addressRouter')();
const customerRouter = require('./Routers/customerRouter')();
const favoriteRouter = require('./Routers/favoriteRouter')();
const orderRouter = require('./Routers/orderRouter')();
const orderRowRouter = require('./Routers/orderRowRouter')();
const orderStatusRouter = require('./Routers/orderStatusRouter')();

app.use('/api', countryRouter);
app.use('/api', brandRouter);
app.use('/api', categoryRouter);
app.use('/api', addressRouter);
app.use('/api', customerRouter);
app.use('/api', favoriteRouter);
app.use('/api', orderRouter);
app.use('/api', orderRowRouter);
app.use('/api', orderStatusRouter);

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
