/**
 * Setup.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    doctorsLoaded : {
        type : 'boolean',
        defaultsTo:false
    },
    hospitalsLoaded : {
        type : 'boolean',
        defaultsTo:false
    },
    medicinesLoaded : {
        type : 'boolean',
        defaultsTo:false
    },
    pharmacyLoaded : {
      type : 'boolean',
      defaultsTo : false
    },
    lgaLoaded : {
      type : 'boolean',
      defaultsTo : false
    }
  }
};
