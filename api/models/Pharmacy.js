/**
 * Pharmacy.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var slug = require('slug');

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        address: {
            type: 'string',
            required: true
        },
        active : {
          type : 'boolean',
          defaultsTo : true
        },
        isDeleted : {
            type : 'boolean',
            defaultsTo : false
        }

    },
      beforeCreate: function(values, cb) {
        values.name = values.name.toLowerCase();

        cb();
    },


    validationMessages: {
        name : {
            required : ' Name is required'
        },
        address : {
            required : ' Address is required'
        }
    }
};
