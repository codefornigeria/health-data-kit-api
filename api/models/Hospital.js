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
            required: true
        },
        facilityTypeDisplay: {
            type: 'string'
        },
        maternalHealth: {
            type: 'boolean'
        },
        emergencyTransport: {
            type: 'boolean'
        },
        skilledBirthAttendant: {
            type: 'boolean'
        },
        numChewsFulltime: {
            type: 'integer'
        },
        phcnElectricity : {
            type: 'boolean'
        },
        cSectionYn  : {
            type :'boolean'
        },
        childHealthMeaslesImmunCalc : {
            type:'boolean'
        },

        numNursesFulltime : {
            type: 'integer'
        } , 
        numDoctorsFulltime: {
            type : 'integer'
        },
        surveyDate : {
            type : 'date'
        },
        facilityId : {
            type : 'string'
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
        antenatalCareYn : {
            type : 'boolean'
        },
        familyPlanningYn: {
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
        photoId : {
            type : 'string'
        },
        surveyId : {
            type : 'string'
        },
        longitude: {
            type: 'float'
        },
        latitude: {
            type: 'float'
        },
        isDeleted : {
            type : 'boolean', 
            defaultsTo : false
        }
    },
    validationMessages: {

    }
};
