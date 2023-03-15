const { Router } = require('express');
const { Basketballers } = require('../models/Basketballers');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const baller = await Basketballers.update(req.params.id, req.body);
      res.json(baller);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const baller = await Basketballers.getAll();
      res.json(baller);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const baller = await Basketballers.post(req.body);
      res.json(baller);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const baller = await Basketballers.getById(req.params.id);
      res.json(baller);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const baller = await Basketballers.delete(req.params.id);
      if (!baller) return null;
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  });
