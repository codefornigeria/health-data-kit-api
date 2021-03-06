/**
 * Doctor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        address: {
            type: 'string',
        },
        gender : {
            type : 'string',
        },  
        telephone: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        folioNumber : {
            type : 'string'
        },
        picture: {
            type: 'string'
        },
        specialization: {
            type: 'string'
        } , 
        isDeleted : {
            type :'boolean',
            defaultsTo:false
        }
    },
    validateDoctor: function(options) {

        var doctorQry = Doctor.findOne({
            name: options.name,
            email: options.email,
            gender : options.gender
        })
        return doctorQry;
    },

  beforeCreate: function(values, cb) {
        values.name = values.name.toLowerCase();
      
        cb();
    },

    validationMessages: {
        name: {
            required: 'Name is required'
        },
        address: {
            required: 'Address is required'
        },
        gender: {
            required: 'Sex is required'
        },
        telephone: {
            required: 'Telephone is required'
        },
        email: {
            required: 'Email is required',
            email: 'Invalid user email',
        },
    },
};
