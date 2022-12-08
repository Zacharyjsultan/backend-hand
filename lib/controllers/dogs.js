const { Router } = require('express');
const { Dogs } = require('../models/Dogs');

module.exports = Router()
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
