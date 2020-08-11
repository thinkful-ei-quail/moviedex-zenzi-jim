  require('dotenv').config()
  const express = require('express');
  const helmet = require('helmet');
  const cors = require('cors');
  const morgan = require('morgan');
  const moviesdata = require('./movieData.js');
  

  const app = express()

  app.use(morgan("common"));
  app.use(helmet())
  app.use(cors())

  app.use(function validateBearerToken(req, res, next) {
    const bearerToken = req.get("Authorization").split(" ")[1];
    const apiToken = process.env.API_TOKEN
    if(bearerToken !== apiToken) {
      return res.status(401).json({error:"unauthorized request"})
    }
    next();
  });
 
  app.get('/movie', (req, res) => {
    let filteredMovies = [...moviesdata];
    const {genre, country, avg_vote} = req.query;
    //do a bunch of stuff
    if(genre) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.genre.toLowerCase().includes(genre.toLowerCase())
      })
    }
    if(country) {
        filteredMovies = filteredMovies.filter(movie => {
          return movie.country.toLowerCase().includes(country.toLowerCase());
        })
    }
    if(avg_vote) {
      const floatVote = parseFloat(avg_vote);
      if (Number.isNaN(floatVote)) {
        res.status(400).send('avg_vote must be a number')
      }
      filteredMovies = filteredMovies.filter(movie => {
        return parseFloat(movie.avg_vote) >= floatVote
      })
    }
   
  res.json(filteredMovies);
  })

  app.listen(8080, () => {
    console.log('server start at port 8080')
  })
    //create endpoint info
    //create search query variables
    //validate data
    //create genre filter
    //create country filter
    //create genre conditional statements
    // create country conditonal statements
    //avg vote conditionals
    //API response
    //Authorizatio Bearer
    //secutiry & cors support
