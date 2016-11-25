/**
 * UtilController
 *
 * @description :: Server-side logic for managing Utils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	lga : function(req, res) {
			var pagination = {
					page: parseInt(req.query.page) || 1,
					limit: parseInt(req.query.perPage) || 10
			};
			var limit = 50;
			var criteria = {
					isDeleted: false
			};

			if (req.query.name) {
					criteria.name = { startsWith : req.query.name} // change this to starts with  or endswith
			}

		
			Lga.count (criteria).then (function(count) {
					var findQuery = Lga.find(criteria)
							.sort('createdAt DESC')
							.paginate(pagination);
					return [count, findQuery]

			}).spread(function(count, lgas) {

					if (lgas.length) {
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
							return ResponseService.json(200, res, " Lgas retrieved successfully", lgas, meta);
					} else {
							return ResponseService.json(200, res,"Lgas not found", [])
					}
			}).catch(function(err) {
					return ValidationService.jsonResolveError(err, res);
			});
	}
};
