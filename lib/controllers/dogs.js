const { Router } = require('express');
const { Dogs } = require('../models/Dogs');

module.exports = Router()
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
