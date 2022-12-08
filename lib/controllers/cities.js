const { Router } = require('express');
const { Cities } = require('../models/Cities');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    const city = await Cities.delete(req.params.id);
    if (!city) next();
    res.status(204);
    res.send();
  })
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
  })
  .put('/:id', async (req, res) => {
    const city = await Cities.update(req.params.id, req.body);
    res.json(city);
  });
