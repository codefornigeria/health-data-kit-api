/**
 * Doctor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var slug = require('slug');
module.exports = {

    attributes: {
        name: {
            type: 'string',
        },
        slug : {
            type : 'string'
        },
        file: {
            type: 'string',
            required  : true
        } ,
        fileType : {
            type : 'string',
        },
        fileUrl : {
            type : 'string'
        },
        fileSize:{
            type: 'integer'
        },
        isDeleted : {
            type : 'boolean' , 
            defaultsTo : false
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
        values.slug = slug(values.title, { lower: true });
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
