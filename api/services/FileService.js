   var XSLX = require('xlsx');
   var request = require('request-promise');
   module.exports = {

       /*
        retrieve all transporters qualified for this order
        */
    
      
      
       parseDoctors: function(req) {

           return new Promise(function(resolve, reject) {
               req.file('doctors').upload({
                   maxBytes: 4000000,
               }, function(error, files) {

                   return error ? reject(error) : resolve(files);
               });
           })
       },

        parseHospitals: function(req) {

           return new Promise(function(resolve, reject) {
               req.file('hospitals').upload({
                   maxBytes: 4000000,
               }, function(error, files) {

                   return error ? reject(error) : resolve(files);
               });
           })
       }, parseMedicine: function(req) {

           return new Promise(function(resolve, reject) {
               req.file('medicine').upload({
                   maxBytes: 4000000,
               }, function(error, files) {

                   return error ? reject(error) : resolve(files);
               });
           })
       }

   }

  