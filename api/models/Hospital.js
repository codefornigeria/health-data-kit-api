/**
 * Hospital.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var slug = require('slug');

module.exports = {

    attributes: {
        facilityName: {
            type: 'string',
            required : true
        },
        slug: {
            type: 'string',
            unique: true
        },
        community: {
            type: 'string'
        },
        ward: {
            type: 'string'
        },
        management: {
            type: 'string'
        },
        improvedWaterSupply: {
            type: 'boolean'
        },
        improvedSanitation: {
            type: 'boolean'
        },
        vaccineFridge: {
            type: 'boolean'
        },
        familyPlannig: {
            type: 'boolean'
        },
        malariaTreatmentArtemisinin: {
            type: 'boolean'
        },
        sector: {
            type: 'string'
        },
        location: {
            type: 'json'
        },
        longitude: {
            type: 'float'
        },
        latitude: {
            type: 'float'
        }
    },
    beforeCreate: function(values, cb) {
        values.slug = slug(values.name, { lower: true });
        cb();
    },
    validationMessages: {

    }
};
