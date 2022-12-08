const { Router } = require('express');
const { Basketballers } = require('../models/Basketballers');

module.exports = Router()
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
  });
