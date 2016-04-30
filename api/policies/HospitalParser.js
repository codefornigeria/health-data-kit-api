/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var Promise = require('bluebird');
 var parseXlsx = require('excel');
   var XSLX = require('xlsx');

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
      FileService.parseHospitals(req).then(function(result) {


                       var workbook = XSLX.readFile(result[0].fd);
                       var first_sheet_name = workbook.SheetNames[0];
                       var worksheet = workbook.Sheets[first_sheet_name];
                       var worksheet_json = XSLX.utils.sheet_to_json(worksheet);
        req.hospitals = worksheet_json;      
        return next()
        })


  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action.');
};
