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
const paymentMethodRouter = require('./Routers/paymentMethodRouter')();
const productRouter = require('./Routers/productRouter')();
const productCategoryRouter = require('./Routers/productCategoryRouter')();
const productImageRouter = require('./Routers/productImageRouter')();
const cartProductRouter = require('./Routers/cartProductRouter')();
const promoCodeRouter = require('./Routers/promoCodeRouter')();
const promoTypeRouter = require('./Routers/promoTypeRouter')();
const reviewRouter = require('./Routers/reviewRouter')();
const shippingMethodRouter = require('./Routers/shippingMethodRouter')();
const taxRouter = require('./Routers/taxRouter')();

app.use('/api', countryRouter);
app.use('/api', brandRouter);
app.use('/api', categoryRouter);
app.use('/api', addressRouter);
app.use('/api', customerRouter);
app.use('/api', favoriteRouter);
app.use('/api', orderRouter);
app.use('/api', orderRowRouter);
app.use('/api', orderStatusRouter);
app.use('/api', paymentMethodRouter);
app.use('/api', productRouter);
app.use('/api', productCategoryRouter);
app.use('/api', productImageRouter);
app.use('/api', cartProductRouter);
app.use('/api', promoCodeRouter);
app.use('/api', promoTypeRouter);
app.use('/api', reviewRouter);
app.use('/api', shippingMethodRouter);
app.use('/api', taxRouter);

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
