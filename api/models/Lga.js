/**
 * Lga.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


var slug = require('slug');
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        lgaCode : {
            type : 'string'
        },
        amapCode : {
            type : 'string'
        },
        location: {
            type: 'json'
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        }
    },

    beforeCreate: function(values, cb) {
        values.slug = slug(values.name, { lower: true });
        cb();
    }
};
