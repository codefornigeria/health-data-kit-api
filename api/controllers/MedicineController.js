/**
 * MedicineController
 *
 * @description :: Server-side logic for managing Medicines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * @apiDefine MedicineSuccessResponseData
     * @apiSuccess {Object} response variable holding response data
     * @apiSuccess {String} response.message response message
     * @apiSuccess {Object} response.data variable holding actual data
     */
    
    /**
     * @apiDefine  MedicineHeader
     * @apiHeader {String} Authorization Basic authorization header token
     */


    /**
     * @api {post} /medicine Create Medicine
     * @apiName Create Medicine
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     *   @apiUse MedicineHeader
     * 
     *
     * @apiParam {String} name  doctor name
     * @apiParam {String} address Doctor address
     * @apiParam {String} [specialization] Doctor Specialization
     * @apiParam {String} telephone Doctor Telephone Number
     * @apiParam {String} email Doctor Email Address
     * @apiParam {String} picture Doctor avatar
     *
     * @apiUse MedicineSuccessResponseData
     *
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *     "response": {
     *     "message": "Medicine created successfully",
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

    Medicine.validateMedicine(verifyPayload).then(function(medicine){
            var existingMedicine = false
             var MedicineCreateQry =false
             if(doctor) {
                existingMedicine = true
                MedicineCreateQry = doc
             }
            if(!doctor) {
             MedicineCreateQry = Medicine.create(data);
            }
            return [existingMedicine,MedicineCreateQry];
        }).spread(function(existingMedicine,medicine) {
            if(existingMedicine){
                       return ResponseService.json(200, res, "Medicine already exists", medicine);
            }
            if (course) {
                return ResponseService.json(200, res, "Medicine created successfully", medicine);
            }

        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });

    },

    

    /**
     * @api {post} /medicine Batch Create Medicine
     * @apiName Batch Create Medicine
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     *   @apiUse MedicineHeader
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
     * @apiUse MedicineSuccessResponseData
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


         var medicines = req.body.medicines;
   
        var promiseArray = [];
        for (var i = 0, len = medicines.length; i < len; i++) {
         
            try {
                promiseArray.push(Medicine.create(medicines[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(medicines) {
            return ResponseService.json(200, res, "Medicines created successfully", medicines);
        });


    },
    
    /**
     * @api {get} /medicine List Medicines
     * @apiName List  Medicines
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     *
     *  @apiUse MedicineHeader
     *  
     * @apiUse MedicineSuccessResponseData
     *
     * 
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Doctors retrieved successfully",
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
     *        message: "Courses not found",
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


        Medicine.count(criteria).then(function(count) {
            var findQuery = Medicine.find(criteria).populateAll()
                .sort('createdAt DESC')
                .paginate(pagination);
            return [count, findQuery]

        }).spread(function(count, medicines) {
            if (medicines.length) {
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
                return ResponseService.json(200, res, " Medicines retrieved successfully", medicines, meta);
            } else {
                return ResponseService.json(200, res,"Medicines not found", [])
            }
        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
    },

    /**
     * @api {get} /medicine/:id View Medicine
     * @apiName View  Medicine
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     * @apiUse MedicineHeader
     *
     * @apiParam {String} id Doctor id
     * @apiUse MedicineSuccessResponseData
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

        Medicine.findOne(criteria).then(function(medicine) {
                if (!doctor) {
                    return ResponseService.json(404, res, "Medicine not found");
                }
                return ResponseService.json(200, res, "Medicine retrieved successfully", medicine);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    /**
     * @api {put} /medicine/:id Update medicine
     * @apiName Update Medicine
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     *  @apiUse MedicineHeader
     * 
     * @apiUse MedicineSuccessResponseData
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
     *        message: "Medicine not found"
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

        Medicine.update({
                id: req.params.id,
                isDeleted: false
            }, data).then(function(updated) {
                if (!updated.length) {
                    return ResponseService.json(404, res, "Medicine not found");
                }
                return ResponseService.json(200, res, "Medicine updated successfully", updated[0]);
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    },

    batchUpdate: function(req, res) {
        var medicines = req.body.medicines;


        var promiseArray = [];
        for (var i = 0, len = medicines.length; i < len; i++) {
            if (!medicines[i].id) {
                continue;
            }

            try {
                promiseArray.push(Medicine.update({
                    id: medicines[i].id
                }, medicines[i]));
            } catch (e) {
                return ResponseService.json(500, res, "Internal Error: Please check inputs");
            }
        }
        Promise.all(promiseArray).then(function(medicines) {
            return ResponseService.json(200, res, "Medicines updated successfully", medicines);
        });
    },


    /**
     * @api {delete} /medicine/:id Delete Medicine
     * @apiName Delete Medicine
     * @apiGroup Medicine
     * @apiVersion 0.0.1
     *
     *  @apiUse MedicineHeader
     *
     * @apiUse MedicineSuccessResponseData
     *
     *   @apiParam {String} Doctor id
     * 
     * @apiSuccessExample Success-Response
     * HTTP/1.1 200 OK
     * {
     *    response: {
     *        message: "Doctor deleted successfully",
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
    delete: function(req, res) {
        Medicine.update({
                id: req.params.id,
                isDeleted: false
            }, {
                isDeleted: true
            }).then(function(deleted) {
                if (!deleted.length) {
                    return ResponseService.json(404, res, "Medicine not found");
                }
                return ResponseService.json(200, res, "Medicine deleted successfully");
            })
            .catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
    }

};

