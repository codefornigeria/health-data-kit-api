/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var csvParser = require('csv');
var parseXlsx = require('excel');
var fs = require('fs');
var S = require('string');
module.exports.bootstrap = function(cb) {


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var setupDoctors = function(setup) {
    var doctorsData = [];
    fs.readFile(sails.config.appPath + '/config/doctors.csv', 'utf8', function(err, doctorscsv) {
      if (err) {
        console.log(err);
      }

      csvParser.parse(doctorscsv, {
        columns: ['Name', 'Address', 'Telephone', 'Email', 'Specialization']
      }, function(err, doctors) {
        if (err) {
          console.log(err)
        }

        doctors.forEach(function(doc) {

          var data = {
            name: doc.Name,
            address: doc.Address,
            telephone: doc.Telephone,
            email: doc.Email,
            specialization: doc.Specialization
          }

          doctorsData.push(data);
        })
        Doctor.create(doctorsData).exec(function cb(err, doctors) {
          if (err) {
            console.log(err)
          }
          if (doctors) {
            Setup.update({
              id: setup.id
            }, {
              doctorsLoaded: true
            }).exec(function cb(err, setup) {
              console.log("Doctors initialized successfully")
            });
          }
        });
      })
    })

  }

  var setupLga = function(setup) {
    var lgaDatas = []
    fs.readFile(sails.config.appPath + '/assets/lga.json', function(err, lgadata) {
      if (err) {
        console.log(err)
      }

      var lgaDataJson = JSON.parse(lgadata);
      lgaDataJson.features.forEach(function(lga) {
        var data = {
          name: lga.properties.lganame.toLowerCase(),
          lgaCode: lga.properties.lgacode,
          amapCode: lga.properties.amapcode
            // location: {
            //     type: lga.geometry.type,
            //     coordinates: lga.geometry.coordinates
            // }
        }
        lgaDatas.push(data)
      })
      Lga.create(lgaDatas).exec(function cb(err, lgas) {
        if (err) {
          console.log(err)
        }
        if (lgas) {
          Setup.update(setup.id, {
            lgaLoaded: true
          }).exec(function cb(err, setup) {
            console.log('lgas initialized successfully')
          })
        }
      })
    })
  }

  var processsLga =function(lga) {
    var lga_Array = lga.split('_');
    var uniqueLGA = '';
    var uniqueState = '';
    if(lga_Array[0].trim() =='cross'){
      uniqueState = lga_Array.splice(0,2).join(' ');
      uniqueLGA = lga_Array.join(' ')
    }else {
      uniqueState = lga_Array.splice(0,1).join(' ');
      uniqueLGA = lga_Array.join(' ')

    }
      return [uniqueLGA, uniqueState]
  }
  var setupHospitals = function(setup) {
    var hospitalsData = [];
    fs.readFile(sails.config.appPath + '/config/hospitals.csv', 'utf8', function(err, hospitalscsv) {
      if (err) {
        console.log(err);
        return;
      }

      csvParser.parse(hospitalscsv, {
        columns: ['id', 'facility_name', 'facility_type_display', 'maternal_health_delivery_services', 'emergency_transport', 'skilled_birth_attendant', 'num_chews_fulltime', 'phcn_electricity', 'c_section_yn', 'child_health_measles_immun_calc', 'num_nurses_fulltime', 'num_nursemidwives_fulltime', 'num_doctors_fulltime', 'date_of_survey', 'facility_id', 'community', 'ward', 'management', 'improved_water_supply', 'improved_sanitation', 'vaccines_fridge_freezer', 'antenatal_care_yn', 'family_planning_yn', 'malaria_treatment_artemisinin', 'sector', 'formhub_photo_id', 'gps', 'survey_id', 'unique_lga', 'latitude', 'longitude', 'geo']
      }, function(err, hospitals) {
        if (err) {
          console.log(err)
        }

        hospitals.forEach(function(hosp) {
          var surveyDateVal = new Date();
          try {
            surveyDateVal = new Date(hosp.date_of_survey);
          } catch (e) {
            surveyDateVal = new Date();
          }
           var lgaData =processsLga(hosp.unique_lga);
          var data = {
            facilityName: hosp.facility_name,
            facilityTypeDisplay: hosp.facility_type_display,
            maternalHealth: (hosp.maternal_health_delivery_services == 'TRUE') ? true : false,
            emergencyTransport: (hosp.emergency_transport == 'TRUE') ? true : false,
            skilledBirthAttendant: (hosp.skilled_birth_attendant == 'TRUE') ? true : false,
            numChewsFulltime: isNaN(parseInt(hosp.num_chews_fulltime)) ? 0 : parseInt(hosp.num_chews_fulltime),
            phcnElectricity: (hosp.phcn_electricity == 'TRUE') ? true : false,
            cSectionYn: (hosp.c_section_yn == 'TRUE') ? true : false,
            childHealthMeaslesImmunCalc: (hosp.child_health_measles_immun_calc == 'TRUE') ? true : false,
            numNursesFulltime: isNaN(parseInt(hosp.num_nurses_fulltime)) ? 0 : parseInt(hosp.num_nurses_fulltime),
            numNurseMidwivesFulltime: isNaN(parseInt(hosp.num_nursemidwives_fulltime)) ? 0 : parseInt(hosp.num_nursemidwives_fulltime),
            numDoctorsFulltime: isNaN(parseInt(hosp.num_doctors_fulltime)) ? 0 : parseInt(hosp.num_doctors_fulltime),
            // surveyDate: surveyDateVal,
            facilityId: hosp.facilityId,
            community: hosp.community,
            ward: hosp.ward,
            management: hosp.management,
            improvedWaterSupply: (hosp.improved_water_supply == 'TRUE') ? true : false,
            improvedSanitation: (hosp.improved_sanitation == 'TRUE') ? true : false,
            vaccineFridge: (hosp.vaccines_fridge_freezer == 'TRUE') ? true : false,
            antenatalCareYn: (hosp.antenatal_care_yn == 'TRUE') ? true : false,
            familyPlanningYn: (hosp.family_planning_yn == 'TRUE') ? true : false,
            malariaTreatmentArtemisinin: (hosp.malaria_treatment_artemisinin == 'TRUE') ? true : false,
            sector: hosp.sector,
            photoId: hosp.formhub_photo_id,
            surveyId: hosp.survey_id,
            uniqueLga: lgaData[0],
            uniqueState: lgaData[1],
            latitude: isNaN(parseFloat(hosp.latitude)) ? 0.0000 : parseFloat(hosp.latitude),
            longitude: isNaN(parseFloat(hosp.longitude)) ? 0.0000 : parseFloat(hosp.longitude),
            location: {
              type: "Point",
              coordinates: [(isNaN(parseFloat(hosp.longitude)) ? 0.0000 : parseFloat(hosp.longitude)), (isNaN(parseFloat(hosp.latitude)) ? 0.0000 : parseFloat(hosp.latitude))]
            }
          }
          hospitalsData.push(data);
        })
        Hospital.create(hospitalsData).exec(function cb(err, hospitals) {
          if (err) {
            console.log(err)
          }
          if (hospitals) {
            Setup.update({
              id: setup.id
            }, {
              hospitalsLoaded: true
            }).exec(function cb(err, setup) {
              if (err) {
                console.log(err)
              }
              console.log("Hospitals initialized successfully")
            });
          }
        });
      })
    })
  }

  var setupPharmacy = function(setup) {

    var pharmacyData = sails.config.pharmacies.map(function(data) {
      data.name = S(data.name).chompLeft('. ').s
      data.latitude = isNaN(parseFloat(data.latitude)) ? 0.0000 : parseFloat(data.latitude),
      data.longitude = isNaN(parseFloat(data.longitude)) ? 0.0000 : parseFloat(data.longitude),
      data.location =  {
                type: "Point",
                coordinates: [(isNaN(parseFloat(data.longitude)) ? 0.0000 : parseFloat(data.longitude)), (isNaN(parseFloat(data.latitude)) ? 0.0000 : parseFloat(data.latitude))]
              }
      return data
    })
    Pharmacy.create(pharmacyData).exec(function cb(err, pharmac) {
      if (err) {
        console.log(err)
      }
      if (pharmac) {
        Setup.update({
          id: setup.id
        }, {
          pharmacyLoaded: true
        }).exec(function cb(err, setup) {
          if (err) {
            console.log(err)
          }
          console.log("Pharmacy initialized successfully")
        });
      }
    });


  }
  var setupMedicine = function(setup) {

  }

  Setup.find().then(function(setup) {
      // console.log(setup)
      if (setup.length) {
        // console.log('setup  called')
        if (setup[0].lgaLoaded == false) {
          // console.log('template is false')
          setupLga(setup[0]);
        }
        if (setup[0].doctorsLoaded == false) {
          setupDoctors(setup[0]);
        }
        if (setup[0].hospitalsLoaded == false) {
          console.log('template is false')
          setupHospitals(setup[0]);
        }
        if (setup[0].medicinesLoaded == false) {
          // console.log('template is false')
          setupMedicine(setup[0]);
        }
        if (setup[0].pharmacyLoaded == false) {
          // console.log('template is false')
          setupPharmacy(setup[0]);
        }

      } else {
        Setup.create({}).then(function(newSetup) {
          setupLga(newSetup);
          setupDoctors(newSetup);
          setupHospitals(newSetup);
          setupMedicine(newSetup);
          setupPharmacy(setup);

        });
      }
      Hospital.native(function(err, collection) {
        collection.ensureIndex({
          location: '2dsphere'
        }, function() {});
      });

      Pharmacy.native(function(err, collection) {
        collection.ensureIndex({
          location: '2dsphere',
          address: 'text',
          name:'text'
        }, function() {});
      });
      cb();
    })
    .catch(function(err) {
      console.log(err);
      console.log("Error checking for setup");
    });

};
