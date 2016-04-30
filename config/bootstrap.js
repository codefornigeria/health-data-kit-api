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

module.exports.bootstrap = function(cb) {
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    var setupDoctors = function(setup) {

    }
    var setupHospitals = function(setup) {

    }

    var setupMedicine = function(setup) {

    }

    Setup.find().then(function (setup){
        // console.log(setup)
        if(setup.length){
        // console.log('setup  called')
            if (setup[0].doctorsLoaded == false) {
                setupDoctors(setup);
            }
            if (setup[0].hospitalsLoaded == false) {
                // console.log('template is false')
                setupHospitals(setup);
            }
              if (setup[0].medicineLoaded == false) {
                // console.log('template is false')
                setupMedicine(setup);
            }
        } else {
            Setup.create({}).then(function(newSetup){
                setupDoctors(newSetup);
                setupHospitals(newSetup);
                setupMedicine(newSetup);

            });
        }
        cb();
    })
    .catch(function (err){
        console.log(err);
        console.log("Error checking for setup");
    });
};
