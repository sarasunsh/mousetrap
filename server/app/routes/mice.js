'use strict';

const express = require('express');
const mime = require('mime');
const models = require('../../db/models');
const Mouse = models.Mouse;

const router = express.Router();
module.exports = router;

router.get('/', function (req, res, next) {
  Mouse.findAll()
  .then(mice => res.json(mice))
  .catch(next);
});

router.get('/:mouseID', function (req, res, next) {
  Mouse.findOne({
    where: {id: req.params.mouseID}
  })
  .then(mouse => res.json(mouse))
  .catch(next);
});

router.post('/', function (req, res, next) {
  Mouse.create(req.body)
  .then(newMouse => res.status(201).json(newMouse))
  .catch(next);
});

