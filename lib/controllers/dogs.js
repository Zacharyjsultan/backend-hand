const { Router } = require('express');
const { Dogs } = require('../models/Dogs');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const dog = await Dogs.deleteDogs(req.params.id);
      if (!dog) next();
      res.status(204);
      res.send();
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const dog = await Dogs.updateDogs(req.params.id, req.body);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const dog = await Dogs.getDogsById(req.params.id);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const dog = await Dogs.getDogs();
      res.json(dog);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const dog = await Dogs.insertDog(req.body);
      res.json(dog);
    } catch (e) {
      next(e);
    }
  });
