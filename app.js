const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const categoryRouter = require('./routes/categoryRoutes');
const userRouter = require('./routes/userRoutes');
const articleRouter = require('./routes/articleRoute');
const articleReactionsRouter = require('./routes/articleRactionsRoute');
const commentsRouter = require('./routes/commentRoute');
const channelRouter = require('./routes/channelRoute');

const globalErrorHandler = require('./utils/globalError');

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
app.use('/api/v1/user', userRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/articles/reactions', articleReactionsRouter);
app.use('/api/v1/articles/comment', commentsRouter);
app.use('/api/v1/channel', channelRouter);

app.use(globalErrorHandler); // Error handler middleware

module.exports = app;
