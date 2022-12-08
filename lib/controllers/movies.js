const { Router } = require('express');
const { Movies } = require('../models/Movies');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const movie = await Movies.post(req.body);
    res.json(movie);
  } catch (e) {
    next(e);
  }
});
