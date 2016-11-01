const Sequelize = require('sequelize');
const db = require('../db');

const Mouse = db.define('mouse', {
    gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false
    },
    genotype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    strain: {
        type: Sequelize.STRING
    // },
    // birthdate: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    // },
    // weandate: {
    //     type: Sequelize.DATE
    // },
    // deathdate: {
    //     type: Sequelize.DATE
    // },
    // bodyweight: {
    //     type: Sequelize.INTEGER
    // },
    // muscleweight: {
    //     type: Sequelize.INTEGER
    // },
    // muscleforce: {
    //     type: Sequelize.INTEGER
    } //,
    // route: {
    //     type: Sequelize.VIRTUAL,
    //     get: function () {
    //         return '/wiki/'+this.urlTitle;
    //     }
    // }
// }, {
    // classMethods: {
    //     findByTag: function(searchTag){
    //     return Page.findAll({
    //             where : {
    //                 tags: {
    //                     $overlap: [searchTag]
    //                 }
    //             }
    //         })
    //     }
    // },
    // instanceMethods: {
    //     findSimilar: function() {
    //         return Page.findAll({
    //             where : {
    //                 id: {
    //                     $ne: this.id
    //                 },
    //                 tags: {
    //                     $overlap: [this.tags]
    //                 }
    //             }
    //         })
    //     }
    // }
});

// Page.hook('beforeValidate', function (page, options) {
//     if (page.title) {
//         const updatedTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
//     } else {
//         const updatedTitle = Math.random().toString(36).substring(2, 7);
//     }
//     page.urlTitle = updatedTitle;
// });

module.exports = Mouse;
