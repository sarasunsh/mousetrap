const Sequelize = require('sequelize');
const db = require('../db');

const Arm = db.define('arm', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    goal: {
        type: Sequelize.INTEGER
    },
    genotype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    treatment: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports =  Arm;
