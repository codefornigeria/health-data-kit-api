var Promise = require('bluebird');

module.exports = {
  create: function(req,res) {
        var data = req.body;
        if(!data) {
          return ResponseService.json(400, res , "Invalid Service Parameters")
        }
        Service.create(data).then(function(service){
          if(!service){
            return ResponseService.json(400, res,"Service Creation Failed")
          }
          return ResponseService.json(200, res, "Service Created Successfully",service)
        }).catch(function(err){
          ValidationService.jsonResolveError(err,res);
        })
  } ,
  view : function(req,res) {
    var criteria = {
        isDeleted: false,
        id: req.params.id
    }

    Service.findOne(criteria).then(function(service) {
            if (!service) {
                return ResponseService.json(404, res, "Service not found");
            }
            return ResponseService.json(200, res, "Service retrieved successfully", service);
        })
        .catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
  },
  list: function(req,res) {
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



    Service.count(criteria).then(function(count) {
        var findQuery = Service.find(criteria)
            .sort('createdAt DESC')
            .paginate(pagination);
        return [count, findQuery]

    }).spread(function(count, services) {
        if (services.length) {
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
            return ResponseService.json(200, res, " Tracks retrieved successfully", services, meta);
        } else {
            return ResponseService.json(200, res, "Track not found", [])
        }
    }).catch(function(err) {
        return ValidationService.jsonResolveError(err, res);
    })

  },
  update: function(req,res){
    var data = req.body;

    if (data.isDeleted) {
        delete data.isDeleted;
    }

    Service.update({
            id: req.params.id,
            isDeleted: false
        }, data).then(function(updated) {
            if (!updated.length) {
                return ResponseService.json(404, res, "Service not found");
            }
            return ResponseService.json(200, res, "Service updated successfully", updated[0]);
        })
        .catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
},

  delete: function(req,res){
    Service.update({
            id: req.params.id,
        }, {
            isDeleted: true
        }).then(function(deleted) {
            if (!deleted.length) {
                return ResponseService.json(404, res, "Service not found");
            }
            return ResponseService.json(200, res, "Service deleted successfully");
        })
        .catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        });
  }


}
