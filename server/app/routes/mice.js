'use strict';

const express = require('express');
const mime = require('mime');
const models = require('../../db/models');
const Mouse = models.Mouse;
const Arm = models.Arm;
const Promise = require('sequelize').Promise; // sequelize comes with Bluebird

const router = express.Router();
module.exports = router;

router.get('/', function (req, res, next) {
    Mouse.findAll()
    .then(mice => res.json(mice))
    .catch(next);
});

router.get('/:mouseID', function (req, res, next) {
    Mouse.findById(req.params.mouseID)
    .then(mouse => res.json(mouse))
    .catch(next);
});

// Adding a new mouse
router.post('/', function (req, res, next) {
    // Arm.findById(1)
    // .then(arm => arm.countMice())
    // .then(res =>console.log(res))
    const armPromise = Arm.getByGenotype(req.body.genotype);
    const mousePromise = Mouse.create(req.body);

    Promise.all([mousePromise, armPromise])
    .spread((newMouse, possibleArms) => {
        newMouse.setArm(possibleArms[0].id);
        res.status(201).json(newMouse);
    })
    .catch(next);
});

// Updating an animal that has died
router.put('/:mouseID', function (req, res, next) {
    Mouse.findById(req.params.mouseID)
    .then(foundMouse => foundMouse.update({deathdate: new Date() }))
    .then(updatedMouse => res.send(updatedMouse))

    // Mouse.update(
    //     {
    //         deathdate: req.body.deathdate
    //     }, {
    //         where: { id: req.params.mouseID }
    //     }
    // )
    // .then(updatedMouse => console.log(updatedMouse))
    .catch(next);
});

