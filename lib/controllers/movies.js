const { Router } = require('express');
const { Movies } = require('../models/Movies');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const movie = await Movies.getById(req.params.id);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const movie = await Movies.getAll();
      res.json(movie);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const movie = await Movies.post(req.body);
      res.json(movie);
    } catch (e) {
      next(e);
    }
  });
