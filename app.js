  require('dotenv').config()
  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  const morgan = require('morgan');
  const moviesdata = require('./movieData');
  

  const app = express()

  app.use(morgan("common"));
  app.use(helmet())
  app.use(cors())

  app.use(function validateBearerToken(req, res, next) {

  });