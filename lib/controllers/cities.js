const { Router } = require('express');
const { Cities } = require('../models/Cities');

module.exports = Router()
  .post('/', async (req, res) => {
    const city = await Cities.post(req.body);
    res.json(city);
  })
  .get('/', async (req, res) => {
    const city = await Cities.getAll();
    res.json(city);
  });
