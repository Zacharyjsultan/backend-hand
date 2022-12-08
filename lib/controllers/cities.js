const { Router } = require('express');
const { Cities } = require('../models/Cities');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const city = await Cities.getById(req.params.id);
    res.json(city);
  })
  .post('/', async (req, res) => {
    const city = await Cities.post(req.body);
    res.json(city);
  })
  .get('/', async (req, res) => {
    const city = await Cities.getAll();
    res.json(city);
  });
