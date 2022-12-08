const { Router } = require('express');
const { Cat } = require('../models/Cats');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const cats = await Cat.getCatByID(req.params.id);
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cats = await Cat.getCats();
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const cats = await Cat.post(req.body);
      res.json(cats);
    } catch (e) {
      next(e);
    }
  });
