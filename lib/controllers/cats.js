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
  })
  .put('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.updateCat(req.params.id, req.body);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.delete(req.params.id);
      if (!cat) return null;
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
