/**
 * PharmacyController
 *
 * @description :: Server-side logic for managing Pharmacies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var Promise = require('bluebird');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

converter.on("end_parsed", function (jsonArray) {
   console.log(jsonArray); //here is your result jsonarray
});

var fs = require('fs');
module.exports = {
    /**
     * @apiDefine PharmacySuccessResponseData
     * @apiSuccess {Object} response variable holding response data
     * @apiSuccess {String} response.message response message
     * @apiSuccess {Object} response.data variable holding actual data
     */

    /**
     * @apiDefine  PharmacyHeader
     * @apiHeader {String} Authorization Basic authorization header token
     */


    /**
     * @api {post} /pharmacy Create Pharmacy
     * @apiName Create Pharmacy
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     *   @apiUse PharmacyHeader
     *
     *
     * @apiParam {String} name  Pharmacy name
     * @apiParam {String} address Pharmacy address
     * @apiParam {Boolean} active Pharmacy active ?
     *
     * @apiUse PharmacySuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *     "response": {
     *     "message": "Pharmacy created successfully",
     *     "data": {
     *           "name" : 'Boluwatife Pharmacy',
     *         "active": true,
     *         address : "no 4 boluwatife street lagos",
     *         "isDeleted": false,
     *         "createdAt": "2016-01-30T11:18:30.284Z",
     *         "updatedAt": "2016-01-30T11:18:30.284Z",
     *         "id": "56ac9c0677783639110e5470
     *         }
     *      }
     *   }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 400 Bad Request
     * {
     * "response": {
     * "message": "Validation error has occured",
     * "errors": {
     * "name": [
     * {
     *     "rule": "required",
     *     "message": "name is required"
     *  }
     *  ],
     *  "address": [
     *   {
     *      "rule": "required",
     *      "message": "address is required"
     *      }
     *    ],
     *    }
     *    }
     * @apiErrorExample Error-Response
     * HTTP/1.1 400 Bad Request
     * {
     * "response": {
     * "message": "Cannot Create Existing Pharmacy",
     *    }
     *    }
     *
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    create: function(req, res) {
        var data = req.body;
        var verifyPayload = {
            name: data.name,
            isDeleted: false
        }

        Hospital.validateHospital(verifyPayload).then(function(doctor) {
            var existingHospital = false
            var HospitalCreateQry = false
            if (hospital) {
                existingHospital = true
                HospitalCreateQry = hospital
            }
            if (!hospital) {
                HospitalCreateQry = Hospital.create(data);
            }
            return [existingHospital, HospitalCreateQry];
        }).spread(function(existingHospital, hospital) {
            if (existingHospital) {
                return ResponseService.json(200, res, "Hospital already exists", hospital);
            }
            if (hospital) {
                return ResponseService.json(200, res, "Hospital created successfully", hospital);
            }

        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });

    },



    /**
     * @api {post} /hospitals Batch Create Hospitals
     * @apiName Batch Create Hospitals
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     *   @apiUse PharmacyHeader
     *
     *
     * @apiParam {object[]} courses  courses
     * @apiParam {Integer} courses.school  school id
     * @apiParam {String} courses.faculty Faculty id
     * @apiParam {String} [courses.discipline] Discipline id
     * @apiParam {String} courses.name course name
     * @apiParam {String} [courses.coursecode] course code
     * @apiParam {String} [courses.description] course description
     * @apiParam {boolean} courses.active  is active course
     * @apiParam {String} courses.unit Course unit
     *
     * @apiUse PharmacySuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     * "response": {
     * "message": "Courses created successfully",
     * "data": [{
     *     "school": "56ac782720d141560b2bf08f",
     *     "faculty": "56ac8a42aad4b35e0e091e13",
     *     "name": "Quantum Physics",
     *     "coursecode": "PHY301",
     *     "description": "Quantum Physics",
     *     "discipline": "56ac9df6d984e2aa11863212",
     *     "unit": 4,
     *     "active": true,
     *     "isDeleted": false,
     *     "createdAt": "2016-01-30T11:18:30.284Z",
     *     "updatedAt": "2016-01-30T11:18:30.284Z",
     *     "id": "56ac9c0677783639110e5470
     * },
     * {
     *     "school": "56ac782720d141560b2bf08f",
     *     "faculty": "56ac8a42aad4b35e0e091e13",
     *     "name": "Quantum Physics",
     *     "coursecode": "PHY301",
     *     "description": "Quantum Physics",
     *     "discipline": "56ac9df6d984e2aa11863212",
     *     "unit": 4,
     *     "active": true,
     *     "isDeleted": false,
     *     "createdAt": "2016-01-30T11:18:30.284Z",
     *     "updatedAt": "2016-01-30T11:18:30.284Z",
     *     "id": "56ac9c0677456639110e5470
     * }]
     * }
     * }
     * @apiErrorExample Error-Response
     * HTTP/1.1 400 Bad Request
     * {
     *    response: {
     *        message: "Course name is required"
     *    }
     * }
     *
     *  @apiErrorExample Error-Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *    response: {
     *        message: "Internal Error: Please check inputs"
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     * @apiError (Error 500) {Object} response variable holding response data
     * @apiError (Error 500) {String} response.message response message
     */
    batchCreate: function(req, res) {


        var doctors = req.body.hospitals;

        var promiseArray = [];
        for (var i = 0, len = hospitals.length; i < len; i++) {

            try {
                promiseArray.push(Hospital.create(hospitals[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(hospitals) {
            return ResponseService.json(200, res, "Hospitals created successfully", hospitals);
        });


    },

    /**
         * @api {post} /pharmacy/search Search Pharmacy
         * @apiName Search  Pharmacy
         * @apiGroup Pharmacy
         * @apiVersion 0.0.1
         *
         *
         *  @apiUse PharmacyHeader
         * @apiParam {object} location  location
         * @apiParam {String} location.name  name of location
         * @apiParam {String} location.longitude  location longitude
         * @apiParam {String} location.latitude  location latitude


         * @apiUse PharmacySuccessResponseData
         *
         *
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         * {
         *    response: {
         *        message: "Hospitals retrieved successfully",
         *        data: [
         *       {
         *              school: "35467irefc4t5",
         *              faculty: "dgbfdt35466736554",
         *              name: "engineering mathematics",
         *              shortName: " MTH 101",
         *              active: true,
         *              unit: 4,
         *              description: "Engineering mathematics description",
         *              createdAt: "2015-12-04T14:12:49.328Z",
         *              updatedAt: "2015-12-04T14:12:49.328Z",
         *              id: "56619f611d2b4c0170107d22"
         *            },
         *            {
         *              school: "35467irefc4t5",
         *              faculty: "dgbfdt35466736554",
         *              name: "engineering mathematics",
         *              shortName: " MTH 101",
         *              active: true,
         *              unit: 4,
         *              description: "Engineering mathematics description",
         *              createdAt: "2015-12-04T14:12:49.328Z",
         *              updatedAt: "2015-12-04T14:12:49.328Z",
         *              id: "56619f611d2b4c0170107d22"
         *            }
         *       ]
         *    }
         * }
         *
         *
         * @apiErrorExample Error-Response
         * HTTP/1.1 404 Not Found
         * {
         *    response: {
         *        message: "Hospitals not found",
         *        data : []
         *    }
         * }
         *
         * @apiError (Error 400) {Object} response variable holding response data
         * @apiError (Error 400) {String} response.message response message
         */

         search: function(req, res) {
             var data = req.body;
            var pagination = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.perPage) || 10
            };

            var criteria = {
                isDeleted: false
            };

            if (data.name) {
                criteria.name ={
                    'startsWith': data.name
                }; // change this to starts with  or endswith
            }



                    Pharmacy.native(function(err, collection) {
                        if (err) {
                            return ResponseService.json(200, res, "Pharmacy not found", [])
                        }

                        collection.geoNear({ type: "Point", coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)] },
                     {
                            limit: 30,
                            maxDistance: 10000, // in meters
                            query: criteria, // allows filtering
                            distanceMultiplier: 0.1,// 3959, // converts radians to miles (use 6371 for km)
                            spherical: true
                        }, function(err, pharmacs) {

                            if (err) {
                                console.log(err)
                                return ResponseService.json(200, res, "Pharmacy not found", [])

                            }
                            if (pharmacs.results.length) {
                                var count = pharmacs.results.length;
                                var numberOfPages = Math.ceil(count / pagination.limit)
                                var nextPage = parseInt(pagination.page) + 1;
                                var meta = {
                                    page: pagination.page,
                                    perPage: pagination.limit,
                                    previousPage: (pagination.page > 1) ? parseInt(pagination.page) - 1 : false,
                                    nextPage: (numberOfPages >= nextPage) ? nextPage : false,
                                    pageCount: numberOfPages,
                                    total: count
                                }
                                return ResponseService.json(200, res, " Hospitals retrieved successfully", pharmacs.results, meta);
                            } else {
                                return ResponseService.json(200, res, "Hospitals not found", [])
                            }

                        })

                    })
         },


    /**
     * @api {get} /pharmacy List Pharmacy
     * @apiName List  Hospitals
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     *
     *  @apiUse PharmacyHeader
     *
     * @apiUse PharmacySuccessResponseData
     *
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Hospitals retrieved successfully",
     *        data: [
     *       {
     *              school: "35467irefc4t5",
     *              faculty: "dgbfdt35466736554",
     *              name: "engineering mathematics",
     *              shortName: " MTH 101",
     *              active: true,
     *              unit: 4,
     *              description: "Engineering mathematics description",
     *              createdAt: "2015-12-04T14:12:49.328Z",
     *              updatedAt: "2015-12-04T14:12:49.328Z",
     *              id: "56619f611d2b4c0170107d22"
     *            },
     *            {
     *              school: "35467irefc4t5",
     *              faculty: "dgbfdt35466736554",
     *              name: "engineering mathematics",
     *              shortName: " MTH 101",
     *              active: true,
     *              unit: 4,
     *              description: "Engineering mathematics description",
     *              createdAt: "2015-12-04T14:12:49.328Z",
     *              updatedAt: "2015-12-04T14:12:49.328Z",
     *              id: "56619f611d2b4c0170107d22"
     *            }
     *       ]
     *    }
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Hospitals not found",
     *        data : []
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    list: function(req, res) {
        var pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.perPage) || 10
        };

        var criteria = {
            isDeleted: false
        };


        if (req.query.name) {
            criteria.name = req.query.name; // change this to starts with  or endswith
        }



        Pharmacy.count(criteria).then(function(count) {
            var findQuery = Hospital.find(criteria).populateAll()
                .sort('createdAt DESC')
                .paginate(pagination);
            return [count, findQuery]

        }).spread(function(count, pharmacys) {
            if (pharmacys.length) {
                var numberOfPages = Math.ceil(count / pagination.limit)
                var nextPage = parseInt(pagination.page) + 1;
                var meta = {
                    page: pagination.page,
                    perPage: pagination.limit,
                    previousPage: (pagination.page > 1) ? parseInt(pagination.page) - 1 : false,
                    nextPage: (numberOfPages >= nextPage) ? nextPage : false,
                    pageCount: numberOfPages,
                    total: count
                }
                return ResponseService.json(200, res, " Pharmacies retrieved successfully", pharmacys, meta);
            } else {
                return ResponseService.json(200, res, "Pharmacies not found", [])
            }
        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
    },

    /**
     * @api {get} /pharmacy/:id View Pharmacy
     * @apiName View  Hospital
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     * @apiUse PharmacyHeader
     *
     * @apiParam {String} id Pharmacy id
     * @apiUse PharmacySuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Doctor retrieved successfully",
     *        data: {
     *              school: "35467irefc4t5",
     *              faculty: "dgbfdt35466736554",
     *              name: "engineering mathematics",
     *              shortName: " MTH 101",
     *              active: true,
     *              unit: 4,
     *              description: "Engineering mathematics description",
     *              createdAt: "2015-12-04T14:12:49.328Z",
     *              updatedAt: "2015-12-04T14:12:49.328Z",
     *              id: "56619f611d2b4c0170107d22"
     *            }
     *    }
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Doctor not found"
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    view: function(req, res) {
        var criteria = {
            isDeleted: false,
            id: req.params.id
        }

        Pharmacy.findOne(criteria).then(function(pharmacy) {
                if (!doctor) {
                    return ResponseService.json(404, res, "Pharmacy not found");
                }
                return ResponseService.json(200, res, "Pharmacy retrieved successfully", pharmacy);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    /**
     * @api {put} /pharmacy/:id Update pharmacy
     * @apiName Update Pharmacy
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     *  @apiUse PharmacyHeader
     *
     * @apiUse PharmacySuccessResponseData
     *
     *
     * @apiParam {Integer} school  school id
     * @apiParam {String} faculty Faculty id
     * @apiParam {String} [discipline] Discipline id
     * @apiParam {String} name course name
     * @apiParam {String} [coursecode] course code
     * @apiParam {String} [description] course description
     * @apiParam {boolean} active  is active course?
     * @apiParam {String} unit Course unit
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Course updated successfully",
     *        data: {}
     *    }
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Course not found"
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    update: function(req, res) {
        var data = req.body;

        if (data.isDeleted) {
            delete data.isDeleted;
        }

        Pharmacy.update({
                id: req.params.id,
                isDeleted: false
            }, data).then(function(updated) {
                if (!updated.length) {
                    return ResponseService.json(404, res, "Pharmacy not found");
                }
                return ResponseService.json(200, res, "Pharmacy updated successfully", updated[0]);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    batchUpdate: function(req, res) {
        var hospitals = req.body.pharmacies;


        var promiseArray = [];
        for (var i = 0, len = pharmacies.length; i < len; i++) {
            if (!pharmacies[i].id) {
                continue;
            }

            try {
                promiseArray.push(Doctor.update({
                    id: pharmacies[i].id
                }, pharmacies[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(pharmacies) {
            return ResponseService.json(200, res, "Hospitals updated successfully", pharmacies);
        });
    },


    /**
     * @api {delete} /pharmacy/:id Delete Pharmacy
     * @apiName Delete Pharmacy
     * @apiGroup Pharmacy
     * @apiVersion 0.0.1
     *
     *  @apiUse PharmacyHeader
     *
     * @apiUse PharmacySuccessResponseData
     *
     * @apiParam {String} Pharmacy id
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Pharmacy deleted successfully",
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Pharmacy not found"
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    delete: function(req, res) {
        Pharmacy.update({
                id: req.params.id,
                isDeleted: false
            }, {
                isDeleted: true
            }).then(function(deleted) {
                if (!deleted.length) {
                    return ResponseService.json(404, res, "Pharmacy not found");
                }
                return ResponseService.json(200, res, "Pharmacy deleted successfully");
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    nhis: function(req,res) {
        var foundData = []
        Hospital.find().then(function(hospitals) {


                converter.fromFile(sails.config.appPath + '/config/nhis-hospital.csv',function(err,results){

            results.map(function(result){
                result.NAME = result.NAME.toLowerCase();
                result.nameId = _.trim(result.NAME.toLowerCase() , ', ');
                var hasNHIS = _.find(hospitals, function(h){
                    h.facilityName == result.NAME
                })
                if(hasNHIS){
                    foundData.push(hasNHIS);
                }
            })

           console.log(results)
            return ResponseService.json(200, res, "NHIS Hospital retrieved successfully", hospitals);

        });
    }).catch(function(err){
        return ValidationService.jsonResolveError(err,res);
    })

    }

};
