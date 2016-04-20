/**
 * SpecializationController
 *
 * @description :: Server-side logic for managing Specializations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * DoctorController
 *
 * @description :: Server-side logic for managing Doctors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');
module.exports = {
    /**
     * @apiDefine SpecializationSuccessResponseData
     * @apiSuccess {Object} response variable holding response data
     * @apiSuccess {String} response.message response message
     * @apiSuccess {Object} response.data variable holding actual data
     */
    
    /**
     * @apiDefine  SpecializationHeader
     * @apiHeader {String} Authorization Basic authorization header token
     */


    /**
     * @api {post} /doctor Create Specialization
     * @apiName Create Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     *   @apiUse SpecializationHeader
     * 
     *
     * @apiParam {String} name  Specialization name
     * @apiParam {String} address Specialization address
     * @apiParam {String} [specialization] Specialization Specialization
     * @apiParam {String} telephone Specialization Telephone Number
     * @apiParam {String} email Specialization Email Address
     * @apiParam {String} picture Specialization avatar
     *
     * @apiUse SpecializationSuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *     "response": {
     *     "message": "Course created successfully",
     *     "data": {
     *         "school": "56ac782720d141560b2bf08f",
     *         "faculty": "56ac8a42aad4b35e0e091e13",
     *         "name": "Quantum Physics",
     *         "coursecode": "PHY301",
     *         "description": "Quantum Physics",
     *         "discipline": "56ac9df6d984e2aa11863212",
     *         "unit": 4,
     *         "active": true,
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
     * "school": [
     * {
     *     "rule": "required",
     *     "message": "School is required"
     *  }
     *  ],
     *  "faculty": [
     *   {
     *      "rule": "required",
     *      "message": "Faculty is required"
     *      }
     *    ],
     *  "name": [
     *  {
     *    "rule": "string",
     *    "message": "`undefined` should be a string (instead of \"null\", which is a object)"
     *    },
     *    {
     *    "rule": "required",
     *    "message": "Name is required"
     *    }
     *    ],
     *    "unit": [
     *    {
     *    "rule": "integer",
     *    "message": "`undefined` should be a integer (instead of \"null\", which is a object)"
     *    },
     *    {
     *    "rule": "required",
     *    "message": "Unit is required"
     *    }
     *    ]
     *    }
     *    }
     *    }
     * @apiErrorExample Error-Response
     * HTTP/1.1 400 Bad Request
     * {
     * "response": {
     * "message": "Cannot Create Existing Course",
     *    }
     *    }
     *    
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    create: function(req, res) {
        var data = req.body;
    var verifyPayload =  {
        name : data.name ,
        isDeleted : false
     }   

    Specialization.validateSpecialization(verifyPayload).then(function(specialization){
            var existingSpecialization = false
             var SpecializationCreateQry =false
             if(specialization) {
                existingSpecialization = true
                SpecializationCreateQry = doc
             }
            if(!specialization) {
             SpecializationCreateQry = specialization.create(data);
            }
            return [existingSpecialization,SpecializationCreateQry];
        }).spread(function(existingSpecialization,specialization) {
            if(existingSpecialization){
                       return ResponseService.json(200, res, "Specialization already exists", specialization);
            }
            if (course) {
                return ResponseService.json(200, res, "Specialization created successfully", specialization);
            }

        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });

    },

    

    /**
     * @api {post} /doctors Batch Create Specialization
     * @apiName Batch Create Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     *   @apiUse SpecializationHeader
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
     * @apiUse SpecializationSuccessResponseData
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


         var specializations = req.body.specializations;
   
        var promiseArray = [];
        for (var i = 0, len = specializations.length; i < len; i++) {
         
            try {
                promiseArray.push(Doctor.create(specializations[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(specializations) {
            return ResponseService.json(200, res, "Specializations created successfully", specializations);
        });


    },
    
    /**
     * @api {get} /specialization List Specialization
     * @apiName List  Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     *
     *  @apiUse SpecializationHeader
     *  
     * @apiUse SpecializationSuccessResponseData
     *
     * 
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Specialization retrieved successfully",
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
     *        message: "Specialization not found",
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
 if (req.query.specialization) {
            criteria.specialization = req.query.specialization;
        }

         if (req.query.email) {
            criteria.email = req.query.email;
        }
        if (req.query.telephone) {
            criteria.telephone = req.query.telephone;
        }


        Specialization.count(criteria).then(function(count) {
            var findQuery = Specialization.find(criteria).populateAll()
                .sort('createdAt DESC')
                .paginate(pagination);
            return [count, findQuery]

        }).spread(function(count, specializations) {
            if (specializations.length) {
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
                return ResponseService.json(200, res, " Specializations retrieved successfully", specializations, meta);
            } else {
                return ResponseService.json(200, res,"Specializations not found", [])
            }
        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
    },

    /**
     * @api {get} /specialization/:id View Specialization
     * @apiName View  Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     * @apiUse SpecializationHeader
     *
     * @apiParam {String} id Specialization id
     * @apiUse SpecializationSuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Specialization retrieved successfully",
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

        Specialization.findOne(criteria).then(function(specialization) {
                if (!specialization) {
                    return ResponseService.json(404, res, "Specialization not found");
                }
                return ResponseService.json(200, res, "Specialization retrieved successfully", specialization);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    /**
     * @api {put} /doctor/:id Update Specialization
     * @apiName Update Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     *  @apiUse SpecializationHeader
     * 
     * @apiUse SpecializationSuccessResponseData
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
     *        message: "Specialization updated successfully",
     *        data: {}
     *    }
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Specialization not found"
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

        Specialization.update({
                id: req.params.id,
                isDeleted: false
            }, data).then(function(updated) {
                if (!updated.length) {
                    return ResponseService.json(404, res, "Specialization not found");
                }
                return ResponseService.json(200, res, "Specialization updated successfully", updated[0]);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    batchUpdate: function(req, res) {
        var specializations = req.body.specializations;


        var promiseArray = [];
        for (var i = 0, len = specializations.length; i < len; i++) {
            if (!specializations[i].id) {
                continue;
            }

            try {
                promiseArray.push(Specialization.update({
                    id: specializations[i].id
                }, specializations[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(specializations) {
            return ResponseService.json(200, res, "Specializations updated successfully", specializations);
        });
    },


    /**
     * @api {delete} /specialization/:id Delete Specialization
     * @apiName Delete Specialization
     * @apiGroup Specialization
     * @apiVersion 0.0.1
     *
     *  @apiUse SpecializationHeader
     *
     * @apiUse SpecializationSuccessResponseData
     *
     *   @apiParam {String} Specialization id
     * 
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Specialization deleted successfully",
     * }
     *
     *
     * @apiErrorExample Error-Response
     * HTTP/1.1 404 Not Found
     * {
     *    response: {
     *        message: "Specialization not found"
     *    }
     * }
     *
     * @apiError (Error 400) {Object} response variable holding response data
     * @apiError (Error 400) {String} response.message response message
     */
    delete: function(req, res) {
        Specialization.update({
                id: req.params.id,
                isDeleted: false
            }, {
                isDeleted: true
            }).then(function(deleted) {
                if (!deleted.length) {
                    return ResponseService.json(404, res, "Specialization not found");
                }
                return ResponseService.json(200, res, "Specialization deleted successfully");
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    }

};


