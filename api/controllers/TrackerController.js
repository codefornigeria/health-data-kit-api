var Promise = require('bluebird');
module.exports= {
  /*
  * this function handles
  loading all already stored hospitals
  */create: function(req,res){
    var  data = req.body;
    Track.create(data).then(function(track){
      if(!track){
        return false
      }
      var poptrack = Track.findOne({
        id: track.id
      }).populateAll()
      return poptrack
    }).then(function(trackers){
      if(!trackers){
        return ResponseService.json(400, res, "Error creating tracks")
      }
      return ResponseService.json(200, res , " tracks created successfully", trackers)
    }).catch(function(err){
      console.log(err);
      ValidationService.jsonResolveError(err ,res)
    })
},
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



        Track.count(criteria).then(function(count) {
            var findQuery = Track.find(criteria).populateAll()
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
                return ResponseService.json(200, res, " Tracks retrieved successfully", pharmacys, meta);
            } else {
                return ResponseService.json(200, res, "Track not found", [])
            }
        }).catch(function(err) {
            return ValidationService.jsonResolveError(err, res);
        })

  },


  viewByHospital: function(req, res) {
      var criteria = {
          isDeleted: false,
          hospital: req.params.id
      }
      Hospital.findOne(criteria).then(function(hospital){
        if(!hospital){
          return [false ,false]
        }
        var tracks = Track.find({
          hospital: req.param.id,
          isDeleted: false
        })
        return [hospital, tracks]
      }).spread(function(hospital, tracks){
        if (!tracks) {
            return ResponseService.json(400, res, "Tracks not found");
        }
        var returned = {
          hospital: hospital,
          tracks: tracks
        }
        return ResponseService.json(200, res, "Tracks retrieved successfully", returned);
    })
    .catch(function(err) {
        return ValidationService.jsonResolveError(err, res);
    });
  },

  view: function(req, res) {
      var criteria = {
          isDeleted: false,
          id: req.params.id
      }

      Track.findOne(criteria).then(function(track) {
              if (!track) {
                  return ResponseService.json(404, res, "Track not found");
              }
              return ResponseService.json(200, res, "Track retrieved successfully", track);
          })
          .catch(function(err) {
              return ValidationService.jsonResolveError(err, res);
          });
  },

  update: function(req, res) {
      var data = req.body;

      if (data.isDeleted) {
          delete data.isDeleted;
      }

      Track.update({
              id: req.params.id,
              isDeleted: false
          }, data).then(function(updated) {
              if (!updated.length) {
                  return ResponseService.json(404, res, "Track not found");
              }
              return ResponseService.json(200, res, "Track updated successfully", updated[0]);
          })
          .catch(function(err) {
              return ValidationService.jsonResolveError(err, res);
          });
  },
  delete: function(req, res) {
      Track.update({
              id: req.params.id,
          }, {
              isDeleted: true
          }).then(function(deleted) {
              if (!deleted.length) {
                  return ResponseService.json(404, res, "Track not found");
              }
              return ResponseService.json(200, res, "Track deleted successfully");
          })
          .catch(function(err) {
              return ValidationService.jsonResolveError(err, res);
          });
  }
}
