/**
 * Track.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var slug = require('slug');

module.exports = {

    attributes: {
        comment: {
            type: 'string',
            required: true
        },
         hospital: {
           model: 'hospital',
           required: true
         },
         image: {
           type: 'string',
           required:true
         },
         rating :{
           type: 'integer' ,
           required: true
         },
         service: {
           type: 'string',
           required: true
         },
        longitude: {
          type: 'float'
        },
        latitude: {
            type: 'float'
        },
        location : {
          type: 'json'
        },
        isDeleted : {
            type : 'boolean',
            defaultsTo : false
        }

    },
      beforeCreate: function(values, cb) {
        cb();
    },


    validationMessages: {
        comment : {
            required : ' Comment is required'
        },
        hospital : {
            required : ' hospital is required'
        },
        service: {
          required: 'service is required'
        },
        image : {
          required: 'image is required'
        },
        rating: {
          required: 'rating is required'
        }
    }
};
