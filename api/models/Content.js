/**
 * Doctor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var slug = require('slug');
module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        cover :  {
            type : 'string'
        },
        slug: {
            type: 'string',
            unique : true
        },
        body : {
            type : 'string',
            required : true
        },
        category : {
            model: 'category'
        },
        images : {
            collection :'image',
            via :'content'
        },
        videos : {
            collection : 'video',
            via : 'content'
        },
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
        values.slug = slug(values.title, { lower: true });
      
        cb();
    },


    validationMessages: {
        title: {
            required: 'Name is required'
        },
        address: {
            required: 'Title is required'
        },
        body: {
            required: 'Body is required'
        },
        slug: {
            required: 'Slug is required',
            unique : 'A Post with this Title already exists'
        },
     
    },
};
