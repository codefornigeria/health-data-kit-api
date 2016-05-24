    /**
     * Course Controller
     *
     * @description :: Server-side logic for managing  News Feed
     */

    var Promise = require('bluebird');
    var pager = require('sails-pager');
    module.exports = {
        /**
         * @apiDefine ContentSuccessResponseData
         * @apiSuccess {Object} response variable holding response data
         * @apiSuccess {String} response.message response message
         * @apiSuccess {Object} response.data variable holding actual data
         */

        /**
         * @apiDefine  ContentHeader
         * @apiHeader {String} Authorization Basic authorization header token
         */


        /**
         * @api {post} /content Create Content
         * @apiName Create Content
         * @apiGroup Content
         * @apiVersion 0.0.1
         *
         *   @apiUse ContentHeader
         * 
         *
         * @apiParam {String} title Content  Title 
         * @apiParam {String} body Content  Body 
         * @apiParam {String} category Content  category
         * @apiParam {Array} images Content  images
         * @apiParam {Array} videos Content  Videos
         *  
         *
         * @apiUse ContentSuccessResponseData
         *
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         * {
         *     "response": {
         *     "message": "Classification created successfully",
         *     "data": {
         *         "name": "First Class",
         *         "slug": "first_class",
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
         *     "message": "Name is required"
         *  }
         *  ],
         *  "slug": [
         *   {
         *      "rule": "required",
         *      "message": "Slug is required"
         *      }
         *    ],
         *    }
         *    }
         *    }
         * @apiErrorExample Error-Response
         * HTTP/1.1 400 Bad Request
         * {
         * "response": {
         * "message": "Classification with that slug already exists",
         *    }
         *    }
         *    
         *
         * @apiError (Error 400) {Object} response variable holding response data
         * @apiError (Error 400) {String} response.message response message
         */
        create: function(req, res) {
            console.log(req.body)
            Content.create(req.body).then(function(content) {
                return ResponseService.json(200, res, " Content created successfully", content);
            }).catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });
        },



        /**
         * @api {get} /content List Content
         * @apiName List   Content
         * @apiGroup Content
         * @apiVersion 0.0.1
         *
         *
         *  @apiUse ContentHeader
         *  
         * @apiUse ContentSuccessResponseData
         *
         * 
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         * {
         *    response: {
         *        message: "Content retrieved successfully",
         *        data: [
         *      {
         *         "name": "First Class",
         *         "slug": "first_class",
         *         "isDeleted": false,
         *         "createdAt": "2016-01-30T11:18:30.284Z",
         *         "updatedAt": "2016-01-30T11:18:30.284Z",
         *         "id": "56ac9c0677783639110e5470
         *         },{
         *         "name": "First Class",
         *         "slug": "first_class",
         *         "isDeleted": false,
         *         "createdAt": "2016-01-30T11:18:30.284Z",
         *         "updatedAt": "2016-01-30T11:18:30.284Z",
         *         "id": "56ac9c0677783639110e5470
         *         }
         *          
         *       ]
         *    }
         * }
         *
         *
         * @apiErrorExample Error-Response
         * HTTP/1.1 404 Not Found
         * {
         *    response: {
         *        message: "Classification not found",
         *        data : []
         *    }
         * }
         *
         * @apiError (Error 400) {Object} response variable holding response data
         * @apiError (Error 400) {String} response.message response message
         */

        list: function(req, res) {
            var perPage = req.query.per_page || 1;
            var currentPage = req.query.page || 10;

            var pagination = {
                page: parseInt(req.query.page) || 1,
                limit: parseInt(req.query.perPage) || 10
            };
            var criteria = {}
            if (req.query.name) {
                criteria.name = req.query.name;
            }
            if (req.query.slug) {
                criteria.slug = req.query.slug;
            }
            Content.count(criteria).then(function(count) {
                var findQuery = Content.find(criteria).populateAll()
                    .sort('createdAt DESC')
                    .paginate(pagination);
                return [count, findQuery]

            }).spread(function(count, contents) {
                if (contents.length) {
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
                    return ResponseService.json(200, res, " Contents retrieved successfully", contents, meta);
                } else {
                    return ResponseService.json(200, res, "Contents not found", [])
                }
            }).catch(function(err) {
                return ValidationService.jsonResolveError(err, res);
            });

            //     pager.paginate(res, Content, criteria, currentPage, perPage);
        },
        /**
         * @api {get} /content/:id View Content
         * @apiName View  Content
         * @apiGroup Content
         * @apiVersion 0.0.1
         *
         * @apiUse ContentHeader
         *
         * @apiParam {String} id Content id 
         * @apiUse ContentSuccessResponseData
         *
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         * {
         *    response: {
         *        message: "Content retrieved successfully",
         *        data:  {
         *         "name": "First Class",
         *         "slug": "first_class",
         *         "isDeleted": false,
         *         "createdAt": "2016-01-30T11:18:30.284Z",
         *         "updatedAt": "2016-01-30T11:18:30.284Z",
         *         "id": "56ac9c0677783639110e5470
         *         }
         *    }
         * }
         *
         *
         * @apiErrorExample Error-Response
         * HTTP/1.1 404 Not Found
         * {
         *    response: {
         *        message: "Content not found"
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

            Content.findOne(criteria).then(function(content) {
                    if (!contnent) {
                        return ResponseService.json(200, res, "Content not found");
                    }
                    return ResponseService.json(200, res, "Content retrieved successfully", content);
                })
                .catch(function(err) {
                    return ValidationService.jsonResolveError(err, res);
                });
        },

        /**
         * @api {put} /content/:id Update Content
         * @apiName Update Content
         * @apiGroup Content
         * @apiVersion 0.0.1
         *
         *  @apiUse ContentHeader
         * 
         * @apiUse ContentSuccessResponseData
         *
         * 
         * @apiParam {String} title Content  Title 
         * @apiParam {String} body Content  Body 
         * @apiParam {String} category Content  category
         * @apiParam {Array} images Content  images
         * @apiParam {Array} videos Content  Videos*
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
         *        message: "Classification not found"
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

            Content.update({
                    id: req.params.id,
                    isDeleted: false
                }, data).then(function(updated) {
                    if (!updated.length) {
                        return ResponseService.json(404, res, "Content not found");
                    }
                    return ResponseService.json(200, res, "Content updated successfully", updated[0]);
                })
                .catch(function(err) {
                    return ValidationService.jsonResolveError(err, res);
                });
        },


        /**
         * @api {delete} /classification/:id Delete Classification
         * @apiName Delete Classification
         * @apiGroup Classification
         * @apiVersion 0.0.1
         *
         *  @apiUse ContentHeader
         *
         * @apiUse ContentSuccessResponseData
         *
         *   @apiParam {String} classification id
         * 
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         * {
         *    response: {
         *        message: "Classification deleted successfully",
         * }
         *
         *
         * @apiErrorExample Error-Response
         * HTTP/1.1 404 Not Found
         * {
         *    response: {
         *        message: "Classification not found"
         *    }
         * }
         *
         * @apiError (Error 400) {Object} response variable holding response data
         * @apiError (Error 400) {String} response.message response message
         */
        delete: function(req, res) {
            Content.update({
                    id: req.params.id,
                    isDeleted: false
                }, {
                    isDeleted: true
                }).then(function(deleted) {
                    if (!deleted.length) {
                        return ResponseService.json(404, res, "Content not found");
                    }
                    return ResponseService.json(200, res, "Content deleted successfully");
                })
                .catch(function(err) {
                    return ValidationService.jsonResolveError(err, res);
                });
        },

        /**
         * @api {post} /upload  Generic file upload
         * @apiName Multipurpose file upload
         * @apiGroup Content
         * @apiVersion 0.0.1
         *
         * @apiParam {String} file    File blob
         * @apiParam {String} fileType    File Type
         *
         * @apiUse AuthSuccessResponseData
         *
         * @apiSuccessExample Success-Response
         * HTTP/1.1 200 OK
         *{
         *  "response": {
         *      "message": "File uploaded successfully",
         *      "data": {
         *          "file": "waec certificate",
         *          "fileUrl": "https://aws.sod.eoe.com",
         *          "fileSize": "300000",
         *          "fileType": "image/jpeg"
         *      }
         *   }
         *}
         * @apiErrorExample Error-Response
         * HTTP/1.1 401 File upload failed
         * {
         *    response: {
         *        message: "File upload failed"
         *    }
         * }
         *
         *
         * @apiError (Error 400) {Object} response variable holding response data
         * @apiError (Error 400) {String} response.message response message
         */

        upload: function(req, res) {
            req.file('file').upload({
                adapter: require('skipper-s3'),
                key: sails.config.settings.S3_Key,
                secret: sails.config.settings.S3_Secret,
                bucket: sails.config.settings.S3_Bucket
            }, function(err, filesUploaded) {
                if (err) {
                    return ResponseService.json(400, res, "File upload failed");
                }
                var data = {};
                data.fileUrl = filesUploaded[0].extra.Location;
                data.file = filesUploaded[0].fd;
                data.fileType = filesUploaded[0].type;
                data.fileSize = filesUploaded[0].extra.size;

                if (req.body.fileType == 'image') {
                    Image.create(data).then(function(image) {
                        if (!image) {
                            return ResponseService.json(400, res, "Image  upload failed");
                        }
                        return ResponseService.json(200, res, "Image Uploaded successfully", image);
                    })
                }
                if (req.body.fileType == 'video') {
                    Video.create(data).then(function(video) {
                        if (!video) {
                            return ResponseService.json(400, res, "Video  upload failed");
                        }
                        return ResponseService.json(200, res, "Video Uploaded successfully", video);
                    })
                }
                return ResponseService.json(200, res, "File uploaded successfully", data);
            });
        }


    };
