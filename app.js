const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const categoryRouter = require('./routes/categoryRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// 1) GLOBAL MIDDLEWARES
//Implement cors
app.use(cors());
app.options('*', cors());

// Set security HTTP headers
// app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//this middleware is must to convert the data into json
app.use(express.json());

//** Routes
app.use('/api/v1/categories', categoryRouter);

app.use(errorHandler); // Error handler middleware

module.exports = app;
