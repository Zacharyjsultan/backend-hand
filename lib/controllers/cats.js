const { Router } = require('express');
const { Cat } = require('../models/Cats');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const cats = await Cat.post(req.body);
    res.json(cats);
  } catch (e) {
    next(e);
  }
});
