/**
 * UtilController
 *
 * @description :: Server-side logic for managing Utils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mv = require('mv')
var path = require('path')
module.exports = {
  lga : function (req, res) {
			var pagination = {
					page: parseInt(req.query.page) || 1,
					limit : parseInt(req.query.perPage) || 10
			}
			var limit = 50
			var criteria = {
					isDeleted: false
			}

			if (req.query.name) {
					criteria.name = { startsWith : req.query.name} // change this to starts with  or endswith
			}


			Lga.count (criteria).then (function(count) {
					var findQuery = Lga.find(criteria)
							.sort('createdAt DESC')
							.paginate(pagination)
					return [count, findQuery]

			}).spread(function(count, lgas) {

					if (lgas.length) {
							var numberOfPages = Math.ceil(count / pagination.limit)
							var nextPage = parseInt(pagination.page) + 1
							var meta = {
									page: pagination.page,
									perPage: pagination.limit,
									previousPage: (pagination.page > 1) ? parseInt(pagination.page) - 1 : false,
									nextPage: (numberOfPages >= nextPage) ? nextPage : false,
									pageCount: numberOfPages,
									total: count
							}
							return ResponseService.json(200, res, " Lgas retrieved successfully", lgas, meta)
					} else {
							return ResponseService.json(200, res,"Lgas not found", [])
					}
			}).catch(function(err) {
					return ValidationService.jsonResolveError(err, res)
			})
	},
	hospitalLga : function(req, res) {
			var pagination = {
					page: parseInt(req.query.page) || 1,
					limit: parseInt(req.query.perPage) || 10
			}
			var limit = 50
			var criteria = {
					select: ['uniqueLga','uniqueState'],
					where: {
							isDeleted: false
					}
			}

			if (req.query.name) {
					criteria.where.uniqueLga = { startsWith : req.query.name} // change this to starts with  or endswith
			}


			Hospital.count (criteria).then (function(count) {
					var findQuery = Hospital.find(criteria)
							.sort('createdAt DESC')
							.paginate(pagination)
					return [count, findQuery]

			}).spread(function(count, lgas) {

					if (lgas.length) {
							var numberOfPages = Math.ceil(count / pagination.limit)
							var nextPage = parseInt(pagination.page) + 1
							var meta = {
									page: pagination.page,
									perPage: pagination.limit,
									previousPage: (pagination.page > 1) ? parseInt(pagination.page) - 1 : false,
									nextPage: (numberOfPages >= nextPage) ? nextPage : false,
									pageCount: numberOfPages,
									total: count
							}
							var transformedLgas = UtilService.keyTransform({
																										uniqueLga:'lga',
																										uniqueState:'state'
							} , lgas)
							var uniqLgas = _.uniq(transformedLgas , function(lga){
									return lga.lga+lga.state
							})
							console.log(uniqLgas)
							return ResponseService.json(200, res, " Lgas retrieved successfully", uniqLgas, meta)
					} else {
							return ResponseService.json(200, res,"Lgas not found", [])
					}
			}).catch(function(err) {
					return ValidationService.jsonResolveError(err, res)
			})
	},

	upload: function(req, res){
		switch(sails.config.settings.uploadAdapter){
				case 'disk':
				console.log(__dirname)
				req.file('file').upload({
          dirname: '../../.tmp/upload/',
        },function(err, filesUploaded) {
						if (err) {

								return ResponseService.json(400, res, "File upload failed")
						}
							var data = {}
            data.fileUrl ="/upload/"+path.basename(filesUploaded[0].fd)
            data.file = filesUploaded[0].fd
            data.fileType = filesUploaded[0].type
            data.fileSize = filesUploaded[0].size
            data.fileStatus = filesUploaded[0].status

						return ResponseService.json(200, res, "File uploaded successfully", data)
				})
				break
				case 's3':
				req.file('file').upload({
						adapter: require('skipper-better-s3'),
						key: sails.config.settings.S3_Key,
						secret: sails.config.settings.S3_Secret,
						bucket: sails.config.settings.S3_Bucket,
						s3params:
	        { ACL: 'public-read'
	        }
	        // And while we are at it, let's monitor the progress of this upload
	      , onProgress: progress => sails.log.verbose('Upload progress:', progress)

				}, function(err, filesUploaded) {
						if (err) {
								return ResponseService.json(400, res, "File upload failed")
						}
						var data = {}
						data.fileUrl = filesUploaded[0].extra.Location
						data.file = filesUploaded[0].fd
						data.fileType = filesUploaded[0].type
						data.fileSize = filesUploaded[0].extra.size
						return ResponseService.json(200, res, "File uploaded successfully", data)
				})
				break;
			}

	}

}
